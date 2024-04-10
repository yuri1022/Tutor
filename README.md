# 家教平台網站-Tutor

## 專案簡介:

- 串接後端API，並搭配 React 框架所打造出的小型專案。
- Tutor是一個提供學生和英文家教老師之間配對服務的網站
- 您登入後即可以在此網站上預約各種分類的課程，在課程完成後，也可以做評分。
- 如果您想開設課程的話，更可以進一步申請成為老師！

![首頁](src/assets/Homepage-login-studentmode.png)
![老師頁面](src/assets/Homepage-login-teachermode.png)
![手機版預覽](src/assets/mobile_ver_preview.jpg)


- Demo 網址: [http://34.125.232.84:3030/](http://34.125.232.84:3030/)
- Demo Video (電腦版) [https://youtu.be/8xkb6eoTsPc](https://youtu.be/8xkb6eoTsPc)
- Back-End Link: [https://github.com/yuan6636/capstone-tutor-backend](https://github.com/yuan6636/capstone-tutor-backend)


## 功能:

根據您的不同身分，您可以在tutor網站內使用不同的功能。

| 身分別   | 權限   | 
|---------|---------|
| 未登入 | 1. 您可以在首頁瀏覽老師的簡介，並透過分類篩選您需要的課程類別。可以使用E-mail註冊Tutor。 |
| Student | 1. 您可以觀看教師的完整資訊，並且預約心儀的課程。<br>2. 您可以在個人頁面看到自己預約的課程，在課程開始前可以刪除預約，結束後則可以對先前的課程做評分與評論。同時，您也可以幫自己編輯簡介與大頭貼。<br>3. Tutor將會根據你的學習時數來幫您排名，前十名的優秀學生將會展示在首頁<br>4. 假如您想開設自己的課程，請點選左上方的「成為老師」來填寫申請表單。 |
| Teacher | 1. 您將擁有Student與Teacher兩種身分，請點選左上方的切換頁面按鈕來切換。<br>2. 在Teacher模式下，您可以編輯教學介紹與風格、開設屬於自己的課程，也可以在未開課且無人預約時修改課程時間。<br>3. 當有人預約課程時，將會在「我的課程」頁面中顯示該課程。<br>4. 當您想預約其他老師開的課程時，別忘了切換回Student模式！ |
| Admin | 1. 您可以在後台觀看使用者名單。 |

## 路由設計 :

| 功能   |身分別| 說明   | URL   |
|---------|---------|---------|---------|
| 首頁 |-| 1. 您可以查看老師的基本資訊，並選取上方的類別按鈕來篩選您想查看的類別。 <br>2. 您可以在登入後查看您的學習時數與排名。 <br>3.您可以在登入後使用關鍵字搜尋老師與課程。 <br>4.您可以點選老師Card中的「預約課程」來預約上課、「瀏覽更多」來查看老師的詳細資訊!| /home 、 /* |
| 老師頁面 |Student,Teacher| 1. 您可以在登入後查看某位老師的詳細資訊，包含自我介紹、教學內容、評價內容……等 | /teacher/:id |
| 學生頁面 |Student| 1. 您可以在登入後查看自己的詳細資訊。包含頭像、自我介紹以及過去預約的所有課程。 <br>2.您可以取消預約未開始的課程，在課程結束後，您可以留下評論與評分。 | /student/:id |
| 申請頁面 |Student| 1. 您可以在登入後、尚未成為老師前透過填寫表單申請成為老師。 | /apply |
| 老師個人頁 |Teacher| 1. 您可以查看自己的詳細資訊與開課時間。包含頭像、國籍、教學類別、自我介紹、教學風格，以及您開設的所有課程。 <br>2.您可以開設課程，尚未有人預約的時候可以修改上課時間。 | /teacher/:id/personal |
| 老師課程頁 |Teacher| 1. 您可以查看自己已經被預約的課程列表。別忘了準時上課! | /course |
| 後台 |Admin| 1. 您可以在後台觀看使用者名單。 | /admin |


## 使用技術：

### React-Bootstrap
使用 Bootstrap 快速建立符合設計稿的網站的同時，搭配 inline style 補足 Bootstrap 不足的部分。
引入 Bootstrap 的 UI 元件，如 button、modal、form，節省開發時間。

### React-route-dom
利用 React-route-dom 達到網頁切換效果。
useNavigate, useParams 做網頁的導向，以及從網址欄抓取需要的數據。

### Axios
使用 Axios 向 API 獲取資料。

### React
使用 useState、useEffect，正確把握 React 從渲染開始到 useEffect 的執行順序。

### 其他輔助套件

1. 使用 sweetalert2 套件，有效率快速做出客製化彈出式提示視窗。
2. 使用 react-big-calendar 客製行事曆介面、
3. React-flag-select套件作為選擇國籍時方便的工具。


## 安裝與下載 :

### 下載檔案至本地資料夾
```
git clone https://github.com/enternalsong/tutor.git
```

### 開啟專案資料夾後安裝檔案
```
npm install
```

### 輸入執行碼
```
npm run dev
```

### 於瀏覽器輸入以下網址
```
http://localhost:5173/
```

## Contributer

### Front-End : @kspsss @yuri1022

### Back-End : @yuan6636 @Tommy0901

### UI/UX


# Tutor -A website which matched English teachers and students.

## Introduction

"Tutor" is a website that provides matching services between students and English tutors. 
Once you log in, you can book various categories of courses on this website. 
And then , you can apply to become a tutor and create your own courses!

![首頁](src/assets/Homepage-login-studentmode.png)
![老師頁面](src/assets/Homepage-login-teachermode.png)
![手機版預覽](src/assets/mobile_ver_preview.jpg)

- Demo Link: [http://34.125.232.84:3030/](http://34.125.232.84:3030/)
- Demo Video (on PC) [https://youtu.be/8xkb6eoTsPc](https://youtu.be/8xkb6eoTsPc)
- Back-End Link: [https://github.com/yuan6636/capstone-tutor-backend](https://github.com/yuan6636/capstone-tutor-backend)

## Function

At Tutor , you can do diffrent things when you are in different identities:

| Role     | Permissions |
|----------|-------------|
| Unregistered | 1. You can browse teachers' profiles on the homepage and filter courses by category. You can also register as a Tutor using E-mail. |
| Student  | 1. You can view complete information about teachers and reserve courses of interest.<br>2. You can see the courses you've reserved on your personal page. Before the course starts, you can cancel the reservation, and after it ends, you can rate and review the course. You can also edit your profile and upload a profile picture.<br>3. Tutor ranks students based on their study hours, and the top ten outstanding students will be displayed on the homepage.<br>4. If you want to create your own courses, click on "Become a Teacher" at the top left to fill out the application form. |
| Teacher  | 1. You have both Student and Teacher roles. Click the top left switch page button to switch between them.<br>2. In Teacher mode, you can edit teaching introductions and styles, create your own courses, and modify course schedules when they are not yet started and have no reservations.<br>- When someone reserves your course, it will appear in "My Courses" page.<br>3. Don't forget to switch back to Student mode when you want to reserve courses offered by other teachers! |
| Admin    | 1. You can view the list of users in the backend. |

## Route Design:

| Function        | Role           | Description                                                                                              | URL                |
|-----------------|----------------|----------------------------------------------------------------------------------------------------------|--------------------|
| Home            | -              | 1. You can view basic information about teachers and filter by category using the category buttons at the top.<br>2. You can check your study hours and ranking after logging in.<br>3. You can search for teachers and courses by keyword after logging in.<br>4. You can click "Book Course" on a teacher's card to reserve a class, or "Read More" to view detailed information about the teacher. | /home, /*          |
| Teacher Page    | Student, Teacher | 1. You can view detailed information about a teacher, including their introduction, teaching content, reviews, etc., after logging in.                           | /teacher/:id       |
| Student Page    | Student        | 1. You can view your own detailed information after logging in, including your profile picture, self-introduction, and all past reserved courses.<br>2. You can cancel reservations for courses that haven't started yet. After a course ends, you can leave comments and ratings. | /student/:id       |
| Apply Page      | Student        | 1. You can apply to become a teacher by filling out a form after logging in and before becoming a teacher.                                                         | /apply             |
| Teacher Personal Page | Teacher    | 1. You can view your detailed information and class schedule, including your profile picture, nationality, teaching category, introduction, teaching style, and all courses you've created.<br>2. You can create courses and modify class times when no one has reserved them yet. | /teacher/:id/personal |
| Teacher Courses Page | Teacher     | 1. You can view a list of courses that have been reserved by students. Don't forget to be on time for class!                                                       | /course            |
| Admin Dashboard | Admin           | 1. You can view a list of users in the backend.                                                          | /admin             |


## How To Use

### Download the files to your local folder:
```
git clone https://github.com/enternalsong/tutor.git
```

### After opening the project folder, install the files:
```
npm install
```

### Enter the execution code:
```
npm run dev
```

### Enter the following URL in your browser:
```
http://localhost:5173/
```

## Tools

### React
Employ useState and useEffect to effectively manage React's rendering process and the execution order of useEffect.

### React-Bootstrap
Utilize Bootstrap to quickly build websites that align with design drafts, 
while complementing Bootstrap's shortcomings with inline styles. 
Incorporate Bootstrap UI components such as buttons, modals, and forms to save development time.

### React-route-dom
Leverage React-route-dom to achieve webpage navigation effects. Use useNavigate and useParams for webpage redirection and fetching necessary data from the URL.

### Axios
Utilize Axios to fetch data from APIs.

### Other Auxiliary Libraries
Use the SweetAlert2 library to efficiently create customized pop-up alert windows.
Utilize the react-big-calendar library to create customized calendar interfaces.
Use the React-flag-select library as a convenient tool for selecting nationalities.


## Contributer

### Front-End : @kspsss @yuri1022

### Back-End : @yuan6636 @Tommy0901

### UI/UX
