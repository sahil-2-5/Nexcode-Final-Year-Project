# Final Year Project

<!-- README: NexCode – Centralized Developer Platform -->

<h1 align="center">NexCode – Centralized Developer Platform</h1>

<p align="center">
  A MERN-based platform that brings AI-assisted coding, Q&A, code snippets, task management, developer news, and an AI tools hub into one place.
  <br/>
  <strong>AI integration powered by Google Gemini API</strong>
</p>

<hr/>

<h2>🚀 Overview</h2>
<p>
  <strong>NexCode</strong> is a centralized web application designed for developers who often switch between multiple platforms for coding help, task management, and news updates.
  It consolidates these workflows into a single, cohesive experience with secure authentication and scalable architecture.
</p>

<h2>✨ Key Features</h2>
<ul>
  <li><strong>AI Prompt</strong> – AI-powered coding assistance using <strong>Gemini API Key</strong> (prompt-based solutions, code suggestions, explanations).</li>
  <li><strong>AI Hub</strong> – Curated directory of AI tools available on one page (search, filter, categories).</li>
  <li><strong>CodeSnippet</strong> – Store, organize, tag, and search personal code snippets.</li>
  <li><strong>Task Manager</strong> – CRUD tasks, priorities, due dates, tags, filters, and search for daily productivity.</li>
  <li><strong>Social Media (NexGram)</strong> – Post developer-centric <em>images</em> or <em>text</em>, like & comment.</li>
  <li><strong>3D Touch</strong> – Interactive <strong>React Three Fiber</strong> object on auth/hero screens for a modern UX.</li>
</ul>

<h3>🛠 Admin Module</h3>
<ul>
  <li>Add / edit / delete AI tool listings for the <strong>AI Hub</strong> (name, category, description, official link, tags, logo/banner via Cloudinary).</li>
</ul>

<hr/>

<h2>🧩 Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li><strong>React.js</strong> (functional components, hooks)</li>
  <li><strong>React Three Fiber</strong> (3D object integration)</li>
  <li><strong>lucide-react</strong> (icon set)</li>
</ul>

<h3>Backend</h3>
<ul>
  <li><strong>Node.js</strong>, <strong>Express.js</strong></li>
  <li><strong>MongoDB</strong> (Mongoose) – primary datastore</li>
  <li><strong>bcrypt</strong> – password hashing</li>
  <li><strong>JWT</strong> – stateless auth tokens</li>
  <li><strong>cookie-parser</strong> – HTTP-only cookie handling for JWT</li>
  <li><strong>CORS</strong> – controlled cross-origin access</li>
  <li><strong>Cloudinary</strong> – media storage for images/banners</li>
</ul>

<h3>AI Integration</h3>
<ul>
  <li><strong>Google Gemini API</strong> – AI prompt/assistant features
    <ul>
      <li>Prompt → AI completion (code suggestions, explanations, bug hints)</li>
      <li>Secure server-to-server calls with API key from environment</li>
    </ul>
  </li>
</ul>

<hr/>

<h2>🔐 Security</h2>
<ul>
  <li><strong>Password Security:</strong> Stored using <code>bcrypt</code> hashing (never plaintext).</li>
  <li><strong>Authentication:</strong> <code>JWT</code> issued on login; stored in <strong>HTTP-only</strong> cookies via <code>cookie-parser</code>.</li>
  <li><strong>CORS:</strong> Restricted allowed origins, headers, and methods.</li>
  <li><strong>Sensitive Keys:</strong> All secrets (Gemini, Cloudinary, JWT) loaded from <code>.env</code>; never committed to VCS.</li>
</ul>

<hr/>

<h2>📦 Project Modules (Details)</h2>

<h3>1) AI Prompt (Gemini)</h3>
<ul>
  <li>Free-form prompt input with context-aware suggestions.</li>
  <li>Modes: explain code, generate snippets, optimize, debug hints.</li>
  <li>Request/response history with copy-to-clipboard.</li>
</ul>

<h3>2) AI Hub</h3>
<ul>
  <li>Directory of AI tools (title, category, description, link).</li>
  <li>Search & filter; tags for quick discovery.</li>
  <li>Admin-side CRUD for tool catalog.</li>
</ul>

<h3>3) CodeSnippet</h3>
<ul>
  <li>Create, read, update, delete snippets.</li>
  <li>Fields: title, language, tags, code body, notes.</li>
  <li>Search by title/tags; syntax-friendly editor (client-side).</li>
</ul>

<h3>4) Task Manager</h3>
<ul>
  <li>CRUD tasks with priority (<em>low/medium/high</em>), due date, tags.</li>
  <li>Filter & sort; mark complete/incomplete.</li>
  <li>Responsive and keyboard accessible.</li>
</ul>

<h3>5) Social Media (NexGram)</h3>
<ul>
  <li>Post image/text; like and comment.</li>
  <li>Uploads handled via <strong>Cloudinary</strong>.</li>
</ul>


<hr/>

<p>Landing Page</p>

<img width="1918" height="929" alt="image" src="https://github.com/user-attachments/assets/95e41c37-574b-4732-955f-74f982d1718f" />

<hr>

<p>Login Page</p>

<img width="1919" height="932" alt="image" src="https://github.com/user-attachments/assets/f7ece14d-c1c0-49c1-9269-87fde5363917" />

<hr>

<p>Signup Page</p>

<img width="1915" height="931" alt="image" src="https://github.com/user-attachments/assets/38b9f0e4-7e79-410a-8222-ef8252ab54cf" />

<hr>

<p>User Profile</p>

<img width="1919" height="929" alt="image" src="https://github.com/user-attachments/assets/71fd8cbb-fbd6-4d81-b473-08c645048d29" />

<hr>

<p>Modules</p>

<img width="1919" height="891" alt="image" src="https://github.com/user-attachments/assets/1f27aab4-dd62-4ec5-9897-0b1c16a4f2fa" />

<hr>

<img width="1919" height="892" alt="image" src="https://github.com/user-attachments/assets/9295f3b8-940f-4f43-9c24-83ca300aa014" />

<p>Other User's Profile</p>

<img width="1895" height="930" alt="image" src="https://github.com/user-attachments/assets/305e3ee2-e631-4f04-a0db-20896d31d821" />

<p>AI Prompt</p>

<img width="1919" height="929" alt="image" src="https://github.com/user-attachments/assets/dd660ef9-7736-4927-a03b-0844077248bb" />

<hr>

<img width="1919" height="924" alt="image" src="https://github.com/user-attachments/assets/897461e8-191c-45dc-8039-cf96ecc16638" />

<hr>

<p>News Module</p>

<img width="1919" height="927" alt="image" src="https://github.com/user-attachments/assets/6ca8dc39-05a7-4182-a6c6-74ab38e5ed21" />

<hr>

<p>NexCode Overflow</p>

<img width="1918" height="928" alt="image" src="https://github.com/user-attachments/assets/f89e2db6-ad8a-4458-90c8-70ac178d36ce" />

<hr>

<p>Code Converter</p>

<img width="1919" height="928" alt="image" src="https://github.com/user-attachments/assets/af09ac28-b80c-4d5b-93c1-3fe333cec3dc" />

<hr>

<p>Task Manager</p>

<img width="1919" height="930" alt="image" src="https://github.com/user-attachments/assets/57570117-3ded-4bba-84a7-f3e9c5766bc9" />

<hr>

<p>Nexgram</p>

<img width="1888" height="932" alt="image" src="https://github.com/user-attachments/assets/26e5ceb4-de94-4717-ad50-fdc7423daae2" />

<hr>

<p>AI Hub</p>

<img width="1919" height="933" alt="image" src="https://github.com/user-attachments/assets/8774f68c-14b4-44bb-ae87-6f6dea25e353" />
