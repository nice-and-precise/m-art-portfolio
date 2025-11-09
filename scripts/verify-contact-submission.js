// Verify contact form submission in database
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function verifySubmission() {
  try {
    console.log('📋 Fetching contact submissions...\n');

    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }

    if (!data || data.length === 0) {
      console.log('📭 No submissions found in database');
      process.exit(0);
    }

    console.log(`✅ Found ${data.length} submission(s):\n`);

    data.forEach((submission, index) => {
      console.log(`--- Submission ${index + 1} ---`);
      console.log(`ID: ${submission.id}`);
      console.log(`Name: ${submission.name}`);
      console.log(`Email: ${submission.email}`);
      console.log(`Phone: ${submission.phone || 'N/A'}`);
      console.log(`Inquiry Type: ${submission.inquiry_type}`);
      console.log(`Message: ${submission.message.substring(0, 100)}${submission.message.length > 100 ? '...' : ''}`);
      console.log(`Status: ${submission.status}`);
      console.log(`Created: ${new Date(submission.created_at).toLocaleString()}`);
      console.log('');
    });

    console.log('✅ Contact form is working correctly!');

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

verifySubmission();
