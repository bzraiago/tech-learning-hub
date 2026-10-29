import unittest

from rag import CORPUS, CitationError, build_input, retrieve, validate_citations


class RetrievalTests(unittest.TestCase):
    def test_retrieves_relevant_source_and_preserves_metadata(self):
        result = retrieve("Quanto tempo vale o link para redefinir minha senha?")

        self.assertEqual([item["id"] for item in result], ["manual-senha-v1"])
        self.assertEqual(result[0]["source"], CORPUS[0]["source"])
        self.assertGreater(result[0]["score"], 0)

    def test_empty_query_and_no_matching_terms_return_no_evidence(self):
        self.assertEqual(retrieve("   "), [])
        self.assertEqual(retrieve("reembolso de produto azul"), [])

    def test_ranking_is_stable_when_scores_tie(self):
        result = retrieve("prazo compra pedido entrega", limit=3)

        self.assertEqual(
            [item["id"] for item in result],
            sorted(item["id"] for item in result),
        )

    def test_context_contains_only_retrieved_source_metadata(self):
        passages = retrieve("cancelar pedido")
        context = build_input("Quando posso cancelar?", passages)

        self.assertIn("[manual-pedidos-v1]", context)
        self.assertIn("Origem: Guia fictício de suporte", context)
        self.assertNotIn("manual-senha-v1", context)


class CitationTests(unittest.TestCase):
    def setUp(self):
        self.passages = retrieve("redefinir senha")

    def test_accepts_retrieved_citation_and_deduplicates_source_ids(self):
        ids = validate_citations(
            "O link dura quinze minutos [manual-senha-v1]. Fonte: [manual-senha-v1].",
            self.passages,
        )

        self.assertEqual(ids, ["manual-senha-v1"])

    def test_rejects_missing_citation(self):
        with self.assertRaisesRegex(CitationError, "não incluiu"):
            validate_citations("O link dura quinze minutos.", self.passages)

    def test_rejects_citation_outside_retrieved_context(self):
        with self.assertRaisesRegex(CitationError, "não recuperada"):
            validate_citations("O prazo é de sete dias [manual-pedidos-v1].", self.passages)


if __name__ == "__main__":
    unittest.main()
