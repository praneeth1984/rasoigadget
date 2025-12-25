-- Verification queries to run after schema creation

-- 1. List all tables
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- 2. Check table counts
SELECT 
    'Users' as "Table",
    COUNT(*) as "Total",
    COUNT(*) FILTER (WHERE "isAdmin" = true) as "Admins",
    COUNT(*) FILTER (WHERE "emailVerified" = true) as "Verified"
FROM "User"
UNION ALL
SELECT 'Orders', COUNT(*), NULL, NULL FROM "Order"
UNION ALL
SELECT 'OTPs', COUNT(*), NULL, NULL FROM "OTP"
UNION ALL
SELECT 'Reset Tokens', COUNT(*), NULL, NULL FROM "PasswordResetToken";

-- 3. Verify admin user exists
SELECT "id", "email", "name", "isAdmin", "createdAt"
FROM "User"
WHERE "isAdmin" = true;

-- 4. List all indexes
SELECT 
    tablename,
    indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- 5. List all triggers
SELECT 
    trigger_name,
    event_object_table as table_name,
    action_timing,
    event_manipulation
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- 6. List all functions
SELECT 
    routine_name,
    routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
ORDER BY routine_name;
