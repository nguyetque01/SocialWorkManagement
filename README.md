# **🚀 Social Work Management System**

## **Introduction**

The Social Work Management System is a web application developed using React and ASP.NET Core, utilizing TypeScript and SCSS for the codebase. This application is designed to manage the registration process, attendance, and calculation of Social Work Days for students in various activities organized by the school and faculty.

## **Key Components**

### **React**

- 🏗️ **Component-based Architecture:** The React application is built on a component-based architecture, facilitating easier development and maintenance.
- 📊 **State Management:** Utilizes React Context or Redux with TypeScript to manage application state and share data between components.
- 🌐 **Routing:** Implements React Router with TypeScript to manage routing and navigation within the application.
- 🎨 **SCSS:** Incorporates SCSS for managing CSS and creating custom styles for the user interface.

### **ASP.NET Core**

- ⚙️ **ASP.NET Core:** Developed on the ASP.NET Core platform, a powerful web framework by Microsoft for building modern and cross-platform web applications.
- 🛠️ **Entity Framework Core:** Utilizes Entity Framework Core to interact with the SQL Server database and perform CRUD operations on data.

### **SQL Server Database**

- 🗄️ **Database Structure:** The SQL Server database is designed to store information about students, social activities, attendance records, and related data.
- 📋 **Data Tables:** Data tables include entities such as Students, Activities, Attendance, and others to store necessary information for managing social activities and calculating Social Work Days.

## **Operational Workflow**

1. 📝 **Activity Registration:** Students register for social activities through the user interface of the React application.
2. ✅ **Attendance Tracking:** The school or faculty uses the administration interface of the ASP.NET Core application to track student attendance in activities.
3. 📅 **Social Work Day Calculation:** Based on the attendance records, the system calculates the Social Work Days for students according to predefined rules.
4. 📝 **Approval and Conversion of Social Work Days:** Students can submit evidence or certificates of participation in local social activities for approval by the school or faculty and conversion into Social Work Days.

## **System Requirements**

- 💻 **Node.js and npm:** Required to run the React application.
- 🖥️ **Visual Studio or Visual Studio Code:** Needed to open and edit the source code of the ASP.NET Core application.
- 🗃️ **SQL Server:** Used to store the database of the application.

## **Installation and Deployment**

1. 🔍 Clone the repository from GitHub to your machine.
2. 🛠️ Configure the SQL Server database and perform necessary migrations for the ASP.NET Core application.
3. ▶️ Run the React application using the **`npm start`** command.
4. 🚀 Deploy the ASP.NET Core application to a web server or virtual machine supporting .NET Core.

## **Contribution**

If you wish to contribute to the development of the application, create a pull request on GitHub, and we will review and integrate the changes.

## **License**

This application is distributed under the MIT license.
