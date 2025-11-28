import avatarAnamolImg from "@/assets/avatar-anamol.jpg";

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  image: string;
  thumbnail: string;
  category: string;
  title: string;
  description: string;
  content: string;
  author?: Author;
}

const authorAnamol: Author = {
  name: "Anamol Dhakal",
  role: "Backend System Developer",
  avatar: avatarAnamolImg,
};

export const blogPostsData: BlogPost[] = [
  {
    id: "deconstructing-the-cloudflare-outage",
    image: "https://cf-assets.www.cloudflare.com/zkvhlag99gkb/9f2k63fiixI2YXDgsnbGq/3c377a6fbd84b5347f814deb6435c476/Cloudflare-Outage-hero-18-nov-2025.png",
    thumbnail: "https://cf-assets.www.cloudflare.com/zkvhlag99gkb/9f2k63fiixI2YXDgsnbGq/3c377a6fbd84b5347f814deb6435c476/Cloudflare-Outage-hero-18-nov-2025.png",
    category: "Tech News",
    title: "Deconstructing the Cloudflare Outage",
    description: "On November 18, 2025, Cloudflare—a critical backbone of the modern internet—experienced a significant global disruption. For nearly six hours, users worldwide encountered HTTP 5xx errors, preventing access to millions of websites and services. While initial symptoms pointed toward a massive cyberattack, the reality was a complex internal software failure.",
    content: `
### Deconstructing the Cloudflare Outage

Contrary to early speculation, this outage was not caused by a Distributed Denial of Service (DDoS) attack or malicious external actors. The failure originated from a routine internal change to improve security.

Cloudflare engineers deployed a permissions update to a **ClickHouse** database cluster to make access controls more explicit. However, this change had an unforeseen side effect: it caused the underlying database query to return duplicate rows. This duplication corrupted the **"feature file"**—a critical configuration file used by Cloudflare’s Bot Management system to fingerprint threats.

The duplication caused the feature file to balloon in size, exceeding a hardcoded limit of **200 features** within the core proxy software. When the proxy attempted to load this oversized file, it could not handle the exception gracefully. Instead of failing safe, the process panicked and crashed. Because this file is regenerated and propagated globally every five minutes, the crash looped repeatedly across the entire network, taking down core traffic handling capabilities.

### The Anatomy of a "Panic"
To understand why the internet went dark, we have to look at the software architecture. The core proxy process is designed for extreme speed and efficiency. When the feature file—which serves as a dynamic rule set—was ingested, the parser encountered a buffer overflow scenario.

In a robust system, this should trigger an error log and a fallback to the last known good configuration. However, in this specific version of the release, the overflow triggered a **system panic**. This is the software equivalent of a "Blue Screen of Death" for the server process.

### The "Fog of War": Why Diagnosis Was Delayed
The incident was particularly difficult to diagnose because of its fluctuating nature. The faulty configuration file was not static; it was being generated dynamically.

Depending on which node of the ClickHouse cluster the query hit, the system would produce either a "good" file or a "bad" file. This caused the network to oscillate between a broken state and a healthy state every few minutes. This "flapping" behavior mimics the signature of a sophisticated, pulsing DDoS attack. Compounding the confusion, Cloudflare's external status page coincidentally went offline due to an unrelated issue, leading engineers to initially suspect a coordinated, hyper-scale attack against their infrastructure.

### Resolution and Remediation
The turning point came when engineers ruled out an attack and identified the oversized feature file as the culprit. The resolution involved a multi-step process:

1.  **Stop the Bleeding:** Engineers halted the generation and propagation of the corrupted feature files.
2.  **Manual Override:** A known "good" version of the file was manually inserted into the distribution queue.
3.  **Force Restart:** The core proxy services were forced to restart to clear the bad state.

Core traffic began flowing normally by **14:30 UTC**, with full resolution achieved by **17:06 UTC**.

### Conclusion
This incident serves as a stark reminder of the fragility inherent in hyperscale distributed systems. A single database query change, intended to improve security, cascaded into a global outage due to a lack of robust input validation in the core proxy. Cloudflare has since announced measures to harden their configuration ingestion pipelines to prevent similar "poison pill" files from bringing down the network in the future.
`,
    author: authorAnamol,
  },
  {
    id: "gemini-3-antigravity-launch",
    image: "https://i.ytimg.com/vi/SVCBA-pBgt0/maxresdefault.jpg",
    thumbnail: "https://i.ytimg.com/vi/SVCBA-pBgt0/maxresdefault.jpg",
    category: "AI & Engineering",
    title: "Google Drops Gemini 3 & Antigravity: The Death of the Localhost?",
    description: "Just days after the Cloudflare incident, Google has shaken the tech world again. The release of Gemini 3.0 isn't just a model upgrade; it introduces 'Antigravity,' a new agent-first development platform that might make your current IDE obsolete. Here is a backend dev's analysis of the new 'Deep Think' mode and what it means for system architecture.",
    content: `
### Beyond the Chatbot: The Era of "Antigravity"

While the tech press is busy hyperventilating over **Gemini 3.0 Pro's** benchmark scores, the real story for us developers is buried in the documentation: **Google Antigravity**.

For the past decade, our workflow hasn't changed much: we write code in an IDE (VS Code, IntelliJ), run it on localhost, and push to a repo. With the November 18th release of Gemini 3, Google is trying to kill that loop entirely. 

Antigravity isn't an IDE; it's an **Agent Orchestration Layer**. Instead of writing the function to "parse PDF and insert into SQL," you define the *outcome* and assign it to an autonomous agent instance. The "Manager" surface allows you to spawn, monitor, and debug multiple agents running in parallel workspaces. It's less like coding and more like being a Mission Control operator.

### Gemini 3.0 Pro: The "Deep Think" Engine
Underpinning this platform is the new Gemini 3.0 model family. The standout feature is **"Deep Think" mode**.

In previous models (like Gemini 1.5 or GPT-4), "reasoning" was essentially just predicting the next likely token based on training data. Gemini 3's Deep Think introduces a hidden "chain of thought" process that occurs *before* output generation. 

Google claims Deep Think allows the model to:
1.  **Hypothesize:** Generate multiple potential solution paths.
2.  **Critique:** Self-evaluate those paths against the user's constraints.
3.  **Backtrack:** Abandon dead-end logic paths without the user ever seeing the failure.

On the **ARC-AGI-2** benchmark—the gold standard for novel abstract reasoning—Gemini 3 Pro reportedly scored **54.2%**, a massive jump from the previous state-of-the-art which hovered around 30%.

### The "Nano Banana" Surprise?
In a weirdly named twist, the release also included the **"Nano Banana"** family of image generation models. While the name is... a choice... the tech is impressive. These are highly optimized, on-device models capable of generating assets needed by the agents in real-time. 

Imagine an agent building a frontend for you; it doesn't just write the HTML/CSS. It now uses Nano Banana to generate the placeholder images and icons *locally* as it codes, removing the need for external asset libraries during the prototyping phase.

### What This Means for Backend Systems
This shifts our job description significantly. We are moving away from **writing logic** to **defining guardrails**.

In an Antigravity workflow, the risk isn't a syntax error; it's a **runaway agent**. 
* How do you prevent an agent from spinning up 500 cloud instances because it "thought" that was the most efficient way to process a dataset? 
* How do you debug a race condition between two AI agents that communicate via natural language?

The "System Developer" of 2026 will need to be an expert in **Agent Governance** and **Output Verification**. We won't be reading stack traces; we'll be reading agent decision logs.

### Verdict
Gemini 3 is powerful, yes. But Antigravity is the disruption. If you're a backend dev, stop ignoring "AI Agents" as a buzzword. The tools to replace your localhost are already here.

***`,
    author: authorAnamol,
  },
  {
    id: "quantum-willow-backend-encryption-crisis",
    image: "https://interestingengineering.com/_next/image?url=https%3A%2F%2Fcms.interestingengineering.com%2Fwp-content%2Fuploads%2F2025%2F10%2FUntitled-design-11.jpg&w=3840&q=75", 
    thumbnail: "https://interestingengineering.com/_next/image?url=https%3A%2F%2Fcms.interestingengineering.com%2Fwp-content%2Fuploads%2F2025%2F10%2FUntitled-design-11.jpg&w=3840&q=75",
    category: "System Architecture",
    title: "The 'Willow' Breakthrough: Why Quantum Just Became a Backend Problem",
    description: "For years, Quantum Computing was a '2030 problem.' This week, Google's announcement of the 'Willow' chip changed the timeline overnight. With 105 qubits and exponential error correction, we are no longer looking at scientific toys—we are looking at the end of RSA encryption. Here is what you need to know about Post-Quantum Cryptography (PQC) before your next security audit.",
    content: `
### The Day the Timeline Shifted

If you’ve been ignoring Quantum Computing news, assuming it’s relevant only to physicists and academics, it’s time to pay attention. This week’s announcement of Google's **"Willow" quantum chip** has effectively moved the "Q-Day" clock forward by several years.

For backend developers, "Q-Day" is the hypothetical date when a quantum computer becomes powerful enough to crack standard public-key encryption algorithms like RSA and Elliptic Curve (ECC). We thought we had a decade. Willow suggests we might have half that.

### What Makes "Willow" Different?
The headline isn't just the qubit count (105 qubits); it’s the **Error Correction**. 

Until now, adding more qubits to a quantum processor actually *increased* the noise and error rate, leading to diminishing returns. Willow is the first chip to demonstrate the opposite: as they scaled the logical qubits, the error rate went *down* exponentially. This is the "Below Threshold" moment the industry has been waiting for. It signals the transition from "noisy, experimental" devices to "fault-tolerant" computing.

### Why Backend Devs Need to Panic (Just a Little)
Currently, 99% of the secure traffic on the internet (HTTPS, SSH, VPNs) relies on integer factorization or discrete logarithm problems—math that is incredibly hard for classical computers but trivially easy for a fault-tolerant quantum computer running Shor’s Algorithm.

With Willow proving that fault tolerance is scalable, the threat of **"Harvest Now, Decrypt Later"** attacks becomes very real. State actors could be intercepting your encrypted traffic today, storing it, and waiting for a Willow-class machine to unlock it in 2027 or 2028.

### The Immediate Action Item: PQC Migration
This isn't just doom-mongering; the solution already exists, but adoption is lagging. The US NIST (National Institute of Standards and Technology) recently finalized three Post-Quantum Cryptography (PQC) algorithms:
1.  **ML-KEM (Kyber):** For general encryption (key encapsulation).
2.  **ML-DSA (Dilithium):** For digital signatures.
3.  **SLH-DSA (Sphincs+):** A backup signature scheme.

As system developers, we need to stop using default RSA-2048 libraries and start auditing our stacks for **crypto-agility**. 
* **Audit:** Check your dependencies. Are you using OpenSSL 3.2+? (It has initial PQC support).
* **Keys:** Are your SSH keys Ed25519? (Better, but still vulnerable eventually). You need to look into hybrid keys that combine classical ECC with Kyber.
* **Databases:** If you are storing encrypted fields (like PII) in your DB using standard AES, you are actually *mostly* fine (AES-256 is considered quantum-resistant), but the *transmission* of that data to your API is the weak link.

### Beyond Security: The Optimization Opportunity
It’s not all bad news. The same tech that threatens encryption offers massive upside for backend systems handling logistics or scheduling. 

We are seeing the emergence of **Quantum-as-a-Service (QaaS)** APIs. Imagine hitting an endpoint to solve a "Traveling Salesman Problem" for a delivery fleet. Instead of a classical heuristic that takes 4 hours to run on an AWS EC2 instance, you could send the matrix to a quantum backend and get a near-perfect global optimization in milliseconds.

### Conclusion
The Willow chip is a marvel of engineering, but for us, it's a wake-up call. The "Quantum Era" isn't coming in the distant future—it started this November. If your roadmap for 2026 doesn't include a PQC migration strategy, you are technically already building legacy software.

***`,
    author: authorAnamol,
  },
  {
    id: "chrome-zero-day-cve-2025-13223",
    image: "https://www.secureitworld.com/wp-content/uploads/2025/07/Google-Chrome-Zero-Day-Vulnerability.jpg",
    thumbnail: "https://www.secureitworld.com/wp-content/uploads/2025/07/Google-Chrome-Zero-Day-Vulnerability.jpg",
    category: "Cybersecurity",
    title: "Critical Alert: Chrome Zero-Day (CVE-2025-13223) Under Active Attack",
    description: "Google has declared 'Code Red' for Chrome users. A critical zero-day vulnerability (CVE-2025-13223) is actively being exploited in the wild, forcing CISA to issue an emergency directive for federal agencies. This isn't a routine update; it is a race against attackers who are already inside the V8 engine.",
    content: `
### The "Update Now" Warning You Shouldn't Ignore

Usually, browser updates are mundane: a UI tweak here, a performance boost there. This week is different. Google has released an emergency out-of-band patch for a high-severity vulnerability tracked as **CVE-2025-13223**, and the U.S. Cybersecurity and Infrastructure Security Agency (CISA) has immediately added it to its "Known Exploited Vulnerabilities" catalog.

Translation: This is not theoretical. Hackers are actively using this bug right now to compromise systems.

### What is CVE-2025-13223?

The vulnerability lies deep within **V8**, Google’s open-source high-performance JavaScript and WebAssembly engine. Specifically, it is a **Type Confusion** vulnerability.

For those of us who work in managed languages like Python or JavaScript, we rarely think about memory types. But V8 is written in C++, where type safety is paramount. A "Type Confusion" bug occurs when the engine is tricked into accessing a piece of memory using a different object type than what was originally stored there.

Think of it like a warehouse labeling error. You put a box of "Feathers" on a shelf, but the inventory system thinks it's a box of "Lead Bricks." If a worker tries to lift it expecting lead, they might throw it through the ceiling. In software terms, this mismatch allows an attacker to corrupt the memory heap.

### The Exploit Chain
Because this bug is in V8, the attack vector is terrifyingly simple: **a malicious website.**

You don't need to download a sketchy .exe file. You just need to visit a webpage that contains specially crafted JavaScript.
1.  **The Trigger:** The malicious JS confuses the V8 engine about the type of an object in memory.
2.  **Heap Corruption:** This confusion allows the script to write data to forbidden memory areas (out-of-bounds write).
3.  **RCE (Remote Code Execution):** If chained correctly, this lets the attacker escape the browser sandbox and execute arbitrary code on your machine.

### Who Is At Risk?
Everyone. Since V8 powers not just Chrome but the entire Chromium ecosystem, this vulnerability affects:
* **Google Chrome**
* **Microsoft Edge**
* **Brave**
* **Opera**
* **Vivaldi**

### Action Items for Developers and Admins

**1. Verification:**
Don't just assume "auto-update" has worked. Go to \`chrome://settings/help\` immediately. You need to be on version **142.0.7444.175** (or .176 for Mac) or higher.

**2. The Electron Question:**
As backend and system developers, we often forget that many of our desktop apps are just Chrome in a trench coat (Electron apps). VS Code, Slack, Discord, and Postman all run on Node.js and V8. While the browser vector is the most dangerous, we should expect security updates for these tools in the coming days as the patched V8 engine trickles down to the Electron framework.

**3. Server-Side V8 (Node.js):**
While this specific exploit targets the browser rendering process, Type Confusion bugs in V8 can theoretically impact Node.js runtimes if they process untrusted code (e.g., server-side rendering of user-submitted templates). Keep an eye on Node.js security releases this week.

### Conclusion
This is the seventh zero-day exploit for Chrome in 2025 alone. It highlights the perpetual arms race between browser vendors and threat actors. Google's "Big Sleep" AI agent actually discovered a *different* V8 bug (CVE-2025-13224) in this same patch cycle, proving that AI is joining the defense—but for now, your best defense is still the "Update" button.

***`,
    author: authorAnamol,
  },
  {
    id: "supply-chain-crisis-harvard-banks",
    image: "https://static.toiimg.com/thumb/msid-125518109,width-1280,height-720,resizemode-4/125518109.jpg", 
    thumbnail: "https://static.toiimg.com/thumb/msid-125518109,width-1280,height-720,resizemode-4/125518109.jpg",
    category: "Cybersecurity",
    title: "The Supply Chain Crisis: Why Harvard and Wall Street Both Fell",
    description: "A new wave of cyberattacks has hit Harvard University and major financial giants like JPMorgan and Citi. But this isn't a coincidence—it is a textbook supply chain attack. Here is why your third-party vendors are currently your biggest security liability.",
    content: `
### The Fortress vs. The Vendor

If you were to try and hack JPMorgan Chase or Harvard University directly, you would face some of the most sophisticated firewalls and intrusion detection systems (IDS) on the planet. But this week's headlines prove a painful truth in systems engineering: **you are only as secure as your least secure vendor.**

Two major stories broke simultaneously:
1.  **Harvard University** suffered a breach exposing donor and student data via a compromised database.
2.  **Wall Street Giants** (JPMorgan, Citi, Morgan Stanley) had client mortgage data exposed not because *they* were hacked, but because **SitusAMC**—a third-party vendor used for loan processing—was compromised.

### Anatomy of a Supply Chain Attack

For us backend developers, this is a wake-up call about dependency management. We often treat third-party APIs and vendors as "trusted zones." We shouldn't.

In the case of the banking breach, the attack vector wasn't the bank's core ledger; it was a lateral move through a vendor's network. When we integrate a vendor (like SitusAMC) into our architecture, we often create a "privileged tunnel"—a VPN or a whitelisted API key that bypasses standard auth checks for efficiency.

Attackers know this. They don't attack the castle gate; they find the delivery truck that has a key to the side door.

### The "Zero Trust" Reality Check

The Harvard breach appears to be phishing-related, leading to unauthorized database access. This highlights the failure of **RBAC (Role-Based Access Control)** in many legacy systems. Once a credential is stolen, the system assumes the user is legitimate.

**What needs to change in our architecture:**
* **Vendor Isolation:** Third-party services should never have "read-all" access. If a vendor needs mortgage data, they should hit a scoped API that returns *only* the specific record needed, not a bulk SQL dump capability.
* **Just-in-Time (JIT) Access:** Admin credentials for databases should not be static. They should be ephemeral, generated for a specific session and revoked immediately after.
* **Egress Filtering:** Why was the data able to leave? Our servers should be configured to block outbound traffic to unknown IP addresses, preventing data exfiltration even if a breach occurs.

### Conclusion

The "SitusAMC" incident is the new "SolarWinds." As developers, we need to audit our \`package.json\` and our API integrations with the same scrutiny we apply to our own code. If a vendor holds your data, their security *is* your security.

***`,
    author: authorAnamol,
  },
  {
    id: "nvidia-earnings-57b-revenue-ai-bubble",
    image: "https://tvnz-1-news-prod.cdn.arcpublishing.com/resizer/v2/a-sign-for-a-nvidia-building-is-shown-in-santa-clara-RS4KH3KTWZCUFKL6AQOHSPYQZA.jpg?auth=b57b242c06db1a88229249e32f9e5208a859a6c31a24c9b889cb8b2baa8f05df&quality=70&width=767&height=431&focal=512%2C341",
    thumbnail: "https://tvnz-1-news-prod.cdn.arcpublishing.com/resizer/v2/a-sign-for-a-nvidia-building-is-shown-in-santa-clara-RS4KH3KTWZCUFKL6AQOHSPYQZA.jpg?auth=b57b242c06db1a88229249e32f9e5208a859a6c31a24c9b889cb8b2baa8f05df&quality=70&width=767&height=431&focal=512%2C341",
    category: "Market & Infrastructure",
    title: "$57 Billion and Growing: Nvidia Smashes Expectations Amidst 'Bubble' Fears",
    description: "Nvidia has done it again. With a record $57 billion in quarterly revenue, the chip giant continues to defy gravity. But as unfilled orders top $500 billion, a critical debate is forming: Is this sustainable structural change, or the peak of a dot-com style bubble? Here is a breakdown of the numbers and what they mean for the future of compute availability.",
    content: `
### The $57 Billion Reality Check

If you were betting on the "AI Bubble" bursting this quarter, you just lost. Nvidia reported its Q3 2025 earnings this week, and the numbers are staggering: **$57 billion in quarterly revenue**, smashing analyst expectations of $54.6 billion.

Driven almost entirely by the Data Center segment—which alone pulled in **$51.2 billion** (up 66% year-over-year)—this report confirms that the infrastructure build-out for the AI era is accelerating, not slowing. The company posted an Earnings Per Share (EPS) of **$1.30**, beating the consensus of $1.24.

### The "$500 Billion" Backlog
Perhaps the most revealing metric wasn't in the revenue column, but in the backlog. CEO Jensen Huang revealed that Nvidia has over **$500 billion in unfilled orders** for its chips.

To put that in perspective: that is half a trillion dollars of capital already committed by Hyperscalers (Microsoft, Google, AWS, Meta) and nation-states just to *get in line* for compute. Huang explicitly dismissed "bubble" concerns, stating:
> *"Blackwell sales are off the charts, and cloud GPUs are sold out... This is a structural shift, not a hype cycle."*

### The Counter-Argument: The "Circular Economy" Risk
Despite the victory lap, some financial analysts remain cautious. The primary concern is the so-called **"Circular AI Economy."**

A significant portion of Nvidia's revenue comes from tech giants who are investing in AI startups... which in turn use that funding to buy Nvidia chips. If the startups don't find a path to profitability, the funding dries up, and the "real" demand for chips could evaporate overnight.

There is also the "Depreciation Time Bomb." Hyperscalers are spending hundreds of billions on H100s and B200s today. If, in two years, a new architecture makes these chips obsolete (or "depreciated" in accounting terms) before they have generated a return on investment, we could see a massive contraction in CAPEX spending in 2027.

### What This Means for Backend Developers
For us in the trenches, this earnings report signals two things:

1.  **Compute Scarcity isn't Ending Soon:** Even with record production, the $500B backlog means access to high-end H100/Blackwell clusters will remain expensive and competitive for the next 12-18 months.
2.  **The Rise of "Agentic AI":** Huang specifically cited "Agentic AI"—systems that reason and act autonomously—as a key driver of future demand. This validates the shift we are seeing in software architecture: moving from simple RAG (Retrieval Augmented Generation) pipelines to complex, multi-step agent workflows that require vastly more inference compute.

### Conclusion
Nvidia is currently the engine of the entire tech economy. While the "bubble" fears are valid from a macro-economic standpoint, the technical reality is that demand for intelligence is still outstripping supply. Until that flips, the green line goes up.

***`,
    author: authorAnamol,
  },
];