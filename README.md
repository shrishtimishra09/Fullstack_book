
Build a small fullstack app to browse, search, and manage books using **Django + GraphQL (backend) and React (frontend).


## Project Structure
project-root/
├── backend/ # Django + GraphQL
└── frontend/ # React (Vite)

## Backend Setup (Django + GraphQL)

1. Create virtual environment and activate:
python -m venv venv
venv\Scripts\activate      

Install dependencies:
pip install django graphene-django psycopg2-binary

Apply migrations:
python manage.py migrate

Seed initial books (optional):
python manage.py seed_books

Run backend server:
python manage.py runserver-http://127.0.0.1:8000/graphql/

2.Frontend Setup (React + Vite / npm)

Navigate to frontend folder:
cd frontend

Install npm dependencies:
npm install

Run development server:
npm run dev-http://localhost:5173

Install Tailwind CSS:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p