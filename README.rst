=================
BigML Drag & Drop
=================

Drag and Drop your CSV files to make predictions with BigML.

Quick start
-----------
1. Start a django project running 'django-admin startproject mysite'.

2. Download the ZIP code of this app and define your BigML User and API-Key in the file Util.py.

3. Run 'pip install bigml-dragdrop...'.
    
4. Add "dragdrop" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = (
        ...
        'dragdrop',
    )

5. Include the dragdrop URLconf in your project urls.py like this::

    url(r'', include('dragdrop.urls')),

6. Run `python manage.py migrate` to create the dragdrop models.

7. Start the development server and visit http://127.0.0.1:8000/admin/
   to create a BigML file (you'll need the Admin app enabled).

8. Visit http://127.0.0.1:8000/ to drag and drop your first CSV file.
