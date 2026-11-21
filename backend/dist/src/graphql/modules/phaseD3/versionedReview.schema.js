"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phaseD3ReviewTypeDefs = void 0;
exports.phaseD3ReviewTypeDefs = `
  """Read-only Phase D2 -> D3 version bridge. It never writes review or ranking rows."""
  type D3VersionedReviewPreview {
    artifactSha256: JSON!
    counts: JSON!
    records: JSON!
    excludedCharacterDrafts: JSON!
  }

  extend type Query {
    """Admin-only: 23 in-scope revised records plus 6 excluded Character drafts."""
    adminD3VersionedReviewPreview: D3VersionedReviewPreview!
  }
`;
