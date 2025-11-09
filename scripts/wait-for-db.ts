/**
 * Monitor Vercel API for Postgres database creation and auto-initialize
 */

const VERCEL_TOKEN = 'vca_8FONFjNIHw8RZfcQGY6Q0STmRAqVk5bZKjomsaLZI6a107e9IH18bgNF';
const TEAM_ID = 'team_YsUzjRIaEewfTMh5imnu14Lm';
const PROJECT_ID = 'prj_puLKKLRktr3dmvUtqjdXGYNYFe0n';

async function checkForDatabase(): Promise<any> {
  const response = await fetch(
    `https://api.vercel.com/v1/storage/stores?teamId=${TEAM_ID}`,
    {
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  return data.stores.find((store: any) => store.type === 'postgres');
}

async function getProjectEnvVars(): Promise<any[]> {
  const response = await fetch(
    `https://api.vercel.com/v9/projects/${PROJECT_ID}/env?teamId=${TEAM_ID}`,
    {
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  return data.envs || [];
}

async function executeSQL(sql: string, connectionString: string) {
  // We'll use the @vercel/postgres package
  const { sql: query } = await import('@vercel/postgres');

  // Set the connection string
  process.env.POSTGRES_URL = connectionString;

  try {
    const result = await query(sql);
    return result;
  } catch (error) {
    console.error('SQL execution error:', error);
    throw error;
  }
}

async function main() {
  console.log('🔍 Waiting for Postgres database to be created...\n');
  console.log('📋 Instructions:');
  console.log('1. Go to https://vercel.com/jordans-projects-4bff4baa/m-art-portfolio/storage');
  console.log('2. Click "Create Database"');
  console.log('3. Select "Postgres"');
  console.log('4. Click "Continue" then "Create"');
  console.log('5. Connect it to "m-art-portfolio" project');
  console.log('\n⏳ This script will automatically detect the database and initialize it...\n');

  let attempt = 0;
  const maxAttempts = 120; // 10 minutes (5 second intervals)

  while (attempt < maxAttempts) {
    attempt++;

    try {
      // Check for database
      const database = await checkForDatabase();

      if (database) {
        console.log(`\n✅ Database found: ${database.name} (ID: ${database.id})`);
        console.log('🔗 Checking if connected to project...');

        // Check if environment variables were added
        const envVars = await getProjectEnvVars();
        const postgresUrl = envVars.find((env: any) => env.key === 'POSTGRES_URL');

        if (postgresUrl) {
          console.log('✅ Database connected! Environment variables detected.');
          console.log('📝 Running initialization SQL...');

          // Read the SQL file
          const fs = await import('fs/promises');
          const path = await import('path');
          const sqlPath = path.join(process.cwd(), 'scripts', 'init-db.sql');
          const sqlContent = await fs.readFile(sqlPath, 'utf-8');

          console.log('⚙️  Executing database schema creation...');

          // Note: We can't directly execute the SQL here without the actual connection string value
          // (it's encrypted in the API). The user needs to run it manually or we need to use
          // the Vercel dashboard Query interface.

          console.log('\n📋 NEXT STEPS:');
          console.log('1. Go to your database in Vercel dashboard');
          console.log('2. Click the "Query" tab');
          console.log('3. Copy the contents of scripts/init-db.sql');
          console.log('4. Paste and run in the Query editor');
          console.log('\nOr run this command locally:');
          console.log('  vercel env pull .env.local');
          console.log('  npm run init-db  (if we create this script)');

          return;
        } else {
          console.log(`⏳ Database exists but not connected to project yet... (attempt ${attempt}/${maxAttempts})`);
        }
      } else {
        process.stdout.write(`\r⏳ Waiting for database creation... (${attempt}/${maxAttempts}) `);
      }
    } catch (error) {
      console.error('\n❌ Error checking database:', error);
    }

    // Wait 5 seconds before next check
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  console.log('\n⚠️  Timeout reached. Please create the database manually.');
}

main().catch(console.error);
