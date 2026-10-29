"""Executa métricas locais de recuperação e contrato de citação, sem rede."""

import json
from pathlib import Path

from rag import CORPUS, CitationError, retrieve, validate_citations


DATASET_PATH = Path(__file__).parent / "evaluations" / "rag-v1.json"


def load_dataset(path=DATASET_PATH):
    dataset = json.loads(path.read_text(encoding="utf-8"))
    if dataset.get("version") != 1:
        raise ValueError("Versão do conjunto RAG não suportada")
    return dataset


def evaluate_dataset(dataset=None):
    dataset = load_dataset() if dataset is None else dataset
    documents = {document["id"]: document for document in CORPUS}

    relevant_total = 0
    relevant_found = 0
    no_evidence_total = 0
    no_evidence_correct = 0
    retrieval_details = []

    for case in dataset["retrieval_cases"]:
        expected_ids = set(case["expected_source_ids"])
        unknown_expected = expected_ids - documents.keys()
        if unknown_expected:
            raise ValueError(f"IDs esperados fora do corpus em {case['id']}")

        results = retrieve(case["question"])
        found_ids = {document["id"] for document in results}
        if case["category"] == "answerable":
            if not expected_ids:
                raise ValueError(f"Caso respondível sem fonte esperada: {case['id']}")
            relevant_total += len(expected_ids)
            relevant_found += len(expected_ids & found_ids)
        elif case["category"] == "no-evidence":
            if expected_ids:
                raise ValueError(f"Caso sem evidência com fonte esperada: {case['id']}")
            no_evidence_total += 1
            no_evidence_correct += int(not found_ids)
        else:
            raise ValueError(f"Categoria desconhecida em {case['id']}")

        retrieval_details.append({
            "id": case["id"],
            "expected_source_ids": sorted(expected_ids),
            "retrieved_source_ids": sorted(found_ids),
            "missed_source_ids": sorted(expected_ids - found_ids),
        })

    citation_total = 0
    citation_correct = 0
    unsupported_accepted = []
    citation_details = []

    for case in dataset["citation_cases"]:
        context_ids = set(case["context_source_ids"])
        unknown_context = context_ids - documents.keys()
        if unknown_context:
            raise ValueError(f"IDs de contexto fora do corpus em {case['id']}")
        context = [documents[source_id] for source_id in case["context_source_ids"]]

        try:
            validate_citations(case["answer"], context)
            actual_valid = True
        except CitationError:
            actual_valid = False

        expected_valid = case["expected_contract_valid"] is True
        citation_total += 1
        citation_correct += int(actual_valid is expected_valid)
        if actual_valid and case["grounding_supported"] is False:
            unsupported_accepted.append(case["id"])
        citation_details.append({
            "id": case["id"],
            "expected_contract_valid": expected_valid,
            "actual_contract_valid": actual_valid,
            "grounding_supported": case["grounding_supported"],
        })

    return {
        "retrieval": {
            "relevant_total": relevant_total,
            "relevant_found": relevant_found,
            "recall_at_2": relevant_found / relevant_total if relevant_total else 0.0,
            "no_evidence_total": no_evidence_total,
            "no_evidence_correct": no_evidence_correct,
            "details": retrieval_details,
        },
        "citations": {
            "total": citation_total,
            "contract_correct": citation_correct,
            "unsupported_claims_accepted": unsupported_accepted,
            "details": citation_details,
        },
    }


def main():
    report = evaluate_dataset()
    retrieval = report["retrieval"]
    citations = report["citations"]
    print("Conjunto local RAG v1 (sem chamadas de modelo)")
    print(
        f"Recall@2: {retrieval['relevant_found']}/{retrieval['relevant_total']} "
        f"({retrieval['recall_at_2']:.2%})"
    )
    print(
        f"Detecção de consulta sem evidência: "
        f"{retrieval['no_evidence_correct']}/{retrieval['no_evidence_total']}"
    )
    print(f"Contrato de citação: {citations['contract_correct']}/{citations['total']}")
    print(
        "Afirmações com ID válido, mas rotuladas sem suporte: "
        f"{len(citations['unsupported_claims_accepted'])}"
    )
    missed = [
        detail["id"] for detail in retrieval["details"]
        if detail["missed_source_ids"]
    ]
    print(f"Casos com fonte relevante não recuperada: {', '.join(missed) or 'nenhum'}")
    print("Este conjunto pequeno demonstra métricas; não aprova qualidade nem um modelo real.")


if __name__ == "__main__":
    main()
