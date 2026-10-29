import unittest

from evaluate import evaluate_dataset


class EvaluationDatasetTests(unittest.TestCase):
    def test_reports_retrieval_abstention_and_citation_contract_separately(self):
        report = evaluate_dataset()

        self.assertEqual(report["retrieval"]["relevant_found"], 3)
        self.assertEqual(report["retrieval"]["relevant_total"], 4)
        self.assertEqual(report["retrieval"]["recall_at_2"], 0.75)
        self.assertEqual(report["retrieval"]["no_evidence_correct"], 2)
        self.assertEqual(report["retrieval"]["no_evidence_total"], 2)
        self.assertEqual(report["citations"]["contract_correct"], 5)
        self.assertEqual(report["citations"]["total"], 5)

    def test_reports_lexical_false_negative_instead_of_hiding_it(self):
        report = evaluate_dataset()
        misses = [
            detail["id"]
            for detail in report["retrieval"]["details"]
            if detail["missed_source_ids"]
        ]

        self.assertEqual(misses, ["retrieval-paraphrase-01"])

    def test_valid_citation_does_not_count_as_grounding(self):
        report = evaluate_dataset()

        self.assertEqual(
            report["citations"]["unsupported_claims_accepted"],
            ["citation-unsupported-claim-01"],
        )


if __name__ == "__main__":
    unittest.main()
