# SubTrack: AI-Powered Subscription & Trial Tracker

SubTrack is a modern, automated dashboard designed to help you regain control over your recurring expenses. Instead of manually entering data for every new subscription, SubTrack uses an intelligent ETL (Extract, Transform, Load) pipeline to do the heavy lifting for you. 

Simply paste a messy email receipt, invoice, or confirmation text into the app, and our AI pipeline will automatically extract the vendor name, billing amount, currency, and trial status, saving it directly to your dashboard.

---

## 🧠 How the Automation Works (The ETL Data Flow)

This project seamlessly connects a beautiful React frontend with a powerful background AI engine. Here is the step-by-step breakdown of what happens when you add a new subscription:

### 1. Data Entry (The Frontend)
You start by clicking the **"Add Subscription"** button on the dashboard. A sleek modal opens, providing a text area where you can paste absolutely any unstructured text—like a forwarded email from Spotify or a messy PDF invoice from Adobe.

![AI Receipt Processor Modal](./screenshots/modal.png)
*(Screenshot: The AI Data Entry Modal)*

### 2. The AI Engine (n8n + Google Gemini)
When you click **"Process with AI"**, the frontend sends your raw text to an **n8n Webhook** running in the background. 
This triggers an automated workflow:
* **Extract:** The webhook receives the messy text.
* **Transform:** A `Basic LLM Chain` node securely passes the text to **Google Gemini**. Gemini is instructed via a `Structured Output Parser` to read the text and extract specific data points: *Vendor Name, Billed Amount, Currency, and Is Trial*.
* **Load:** Once Gemini formats the data perfectly into JSON, a Supabase node inserts the new structured record directly into the database.

![n8n AI Workflow](./screenshots/n8n-workflow.png)
*(Screenshot: The n8n visual programming canvas showing the AI extraction pipeline)*

### 3. Database Storage (Supabase)
The data is securely stored in a **Supabase PostgreSQL database**. The table is protected by Row Level Security (RLS) policies, ensuring that only authorized users (or the public dashboard, as configured) can read the subscription data.

### 4. Real-Time Dashboard
Back on the frontend, the Next.js application uses `force-dynamic` rendering. As soon as the AI pipeline finishes its job and saves the data, the dashboard automatically refreshes. Your new subscription appears beautifully formatted as a full-width row, complete with the timestamp and active status.

![SubTrack Dashboard](./screenshots/dashboard.png)
*(Screenshot: The SubTrack Dashboard displaying the newly processed subscriptions)*

---

## 🛠️ Technology Stack

* **Frontend:** Next.js 15 (App Router), React, TypeScript
* **Styling & UI:** Tailwind CSS v4, shadcn/ui, Framer Motion (Animations), Lucide React (Icons)
* **AI & Automation:** n8n (Workflow Automation), Google Gemini (LLM)
* **Database:** Supabase (PostgreSQL)

## 🚀 Getting Started Locally

### Prerequisites
1. Node.js installed.
2. A local or cloud instance of n8n.
3. A Supabase project with a `subscriptions` table.

### Installation
1. Clone the repository.
2. Navigate to the frontend directory: `cd Frontend`
3. Install dependencies: `npm install`
4. Create a `.env.local` file and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
5. Start the Next.js development server: `npm run dev`
6. Ensure your n8n workflow is set to **Active** (Published) so the webhook can listen for frontend requests.

Navigate to `http://localhost:3000` to see the dashboard in action!
