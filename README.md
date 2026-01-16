# Lead Management Dashboard

A high-performance Lead Management Dashboard built with **Next.js 16 (Turbopack)**, **MongoDB**, and **Shadcn UI**. This application allows users to manage leads, track conversions through analytics, and maintain a centralized database.

##  Deployed URL
**Live Demo:** *(https://lead-management-dashboard-five.vercel.app/)*

##  Demo Credentials
Use the following credentials to access the dashboard:
* **Username:** `admin`
* **Password:** `admin123`

##  Setup Instructions

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/nizam-321/Lead-Management-Dashboard.git](https://github.com/nizam-321/Lead-Management-Dashboard.git)
   cd lead-dashboar
Install Dependencies:

Bash
npm install
Configure Environment Variables: Create a .env.local file in the root directory and add:

Code snippet
MONGODB_URI=your_mongodb_connection_string
Run the Application:

Bash
npm run dev
 Seeding Method
To populate the dashboard with 500+ dummy leads for testing, run the custom seeding script:

Bash
npm run seed
Note: Ensure your MONGODB_URI is correctly set before seeding.

##  Features
- **Dashboard Overview:** Real-time stats for total, new, and converted leads.
- **Analytics Charts:** Visual representation of leads distribution using Recharts.
- **Search & Filter:** Instantly filter leads by status or search by name/email.
- **Database Seeding:** Comes with a script to seed 500+ dummy leads for testing.
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.

 Tech Stack
Framework: Next.js 16.1.2

Styling: Tailwind CSS & Shadcn UI

Database: MongoDB with Mongoose

Charts: Recharts
