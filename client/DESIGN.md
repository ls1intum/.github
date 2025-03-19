# 🎨 UI Design Recommendation for AET Web Apps  

Creating a **consistent and user-friendly design** is essential for our web apps at AET. Below are the recommended **UI guidelines** to ensure consistent design and a smooth user experience.  

## 🏠 Landing Page  
- **Features & FAQs** should be prominently displayed to help new users understand what the app is used for 
- The **Login button** should be highly visible for quick access.  
- **Most features** should be accessible **before requiring login** (avoid an early login wall).  

<details>
<summary>Example</summary>

![Landing Page](design_screenshots/landing_page.png)
</details>

## Header Design  
- Should include:
    - **App Name**
    - **Dark Mode Toggle 🌙/☀️**
    - **Login Button**
- Should be about **40px in height**.  
- **Non-sticky**: The header should **not** remain fixed while scrolling.  

<details>
<summary>Example</summary>

![Header Design](design_screenshots/header.png)
</details>

## Footer Design  
- Should include:  
  - **"Built by"** attribution 👨‍💻  
  - **About & Legal pages** 📜  
  - **Version number** 🛠️  
  - **Bug report / feature request link** 🐞 

<details>
<summary>Example</summary>

![Footer Design](design_screenshots/footer.png)
</details> 

## 📂 Project Page  
- **Projects should be displayed as cards** instead of a list for better **visual clarity**. The cards should include the **title of the project** as well as **most relevant information about the project**
- **No sidebar** should be used on the **main project page**.  

<details>
<summary>Example</summary>

![Project card](design_screenshots/project_card.png)
</details> 

## ⏩ Sidebar Navigation  
- **Used for switching different in-project contexts** but **not for switching between projects**.  
- **Project settings** should be placed **at the bottom** of the sidebar.  
- **Project context** should be displayed at the **top** of the sidebar.
- Items in the sidebar should contain a **icon** and a **short text**
- Sidebar should be **collapsible & expandable** via a **prominent chevron icon**.

<details>
<summary>Example</summary>

![Sidebar](design_screenshots/sidebar1.png)
![Sidebar](design_screenshots/sidebar2.png)
</details> 

## 🔐 Authentication  
- If **Keycloak** is used, the **Keycloakify theme** should be applied for a unified login experience for all AET apps. 

<details>
<summary>Example</summary>

![Login](design_screenshots/login.png)
</details> 

## ℹ️ About Page  
- Should include:  
  - 📸 **Features with screenshots** for clarity.  
  - 🤝 **Contributor information**  to acknowledge contributions.  
  - 🛠️ **Developer details** such as **version number, GitHub SHA** etc..  

Thanks for following these recommendations, with that we ensure a **modern, accessible, and user-friendly** experience for AET web applications! 🚀  

<details>
<summary>Example</summary>

![Login](design_screenshots/about.png)
</details> 

# Further Ideas to Improve UI Design@AET
- Add keycloakify project for AET that is included by different projects
- Add boilerplate html code for Imprint etc.
- Add color theme for AET following the TUM theme
- Agree on a single icon library for all projects (e.g. tabler)

