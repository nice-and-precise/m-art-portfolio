// Create contact_submissions table using Supabase client
// Usage: node scripts/create-contact-table-supabase.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createTable() {
  try {
    console.log('Creating contact_submissions table...');

    // Test if table exists by trying to query it
    const { error: queryError } = await supabase
      .from('contact_submissions')
      .select('id')
      .limit(1);

    if (queryError) {
      if (queryError.code === 'PGRST204' || queryError.message.includes('does not exist')) {
        console.log('\n⚠️  Table does not exist yet.');
        console.log('\nPlease create the table manually:');
        console.log('\n1. Go to: https://supabase.com/dashboard/project/bmpvyneaekkyrnldkpta/editor');
        console.log('2. Click "SQL Editor" in the left sidebar');
        console.log('3. Click "New query"');
        console.log('4. Copy and paste the SQL from: supabase/migrations/002_create_contact_submissions.sql');
        console.log('5. Click "Run" or press Cmd/Ctrl + Enter');
        console.log('\nAfter creating the table, run this script again to verify.');
        process.exit(1);
      } else {
        console.log('✅ Table exists!');
        console.log('Testing insert...');

        // Try to insert a test record
        const testData = {
          id: `test-${Date.now()}`,
          name: 'Test User',
          email: 'test@example.com',
          inquiry_type: 'general',
          message: 'This is a test message',
          status: 'new'
        };

        const { error: insertError } = await supabase
          .from('contact_submissions')
          .insert(testData);

        if (insertError) {
          console.error('❌ Insert test failed:', insertError.message);
          process.exit(1);
        }

        console.log('✅ Insert test successful!');

        // Clean up test record
        await supabase
          .from('contact_submissions')
          .delete()
          .eq('id', testData.id);

        console.log('✅ Contact form is ready to use!');
      }
    } else {
      console.log('✅ Table already exists and is accessible!');
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createTable();
