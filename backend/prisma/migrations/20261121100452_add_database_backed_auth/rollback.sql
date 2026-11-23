-- Rollback for 20261121100452_add_database_backed_auth.
-- Destructive: use only on an isolated database or after an approved restore.
DROP TABLE IF EXISTS "PasswordResetToken";
DROP TABLE IF EXISTS "AuthSession";
DROP TABLE IF EXISTS "Admin";
DROP TABLE IF EXISTS "AuthRateLimit";
ALTER TABLE "User" DROP COLUMN IF EXISTS "status";
ALTER TABLE "User" DROP COLUMN IF EXISTS "role";
DROP TYPE IF EXISTS "AdminStatus";
DROP TYPE IF EXISTS "AdminRole";
DROP TYPE IF EXISTS "AuthSubjectType";
DROP TYPE IF EXISTS "AccountStatus";
DROP TYPE IF EXISTS "UserRole";
