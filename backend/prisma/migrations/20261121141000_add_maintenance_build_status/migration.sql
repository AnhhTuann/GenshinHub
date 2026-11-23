-- Adds a truthful public status for owner-authorized development maintenance revisions.
-- Existing APPROVED payloads, checksums and audit history are untouched.
ALTER TYPE "CharacterBuildReviewStatus" ADD VALUE IF NOT EXISTS 'MAINTENANCE';
