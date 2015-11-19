=================
BigML Drag & Drop
=================

Drag and Drop your CSV files to make predictions with BigML.

Quick start
-----------

1. Add "dragdrop" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = (
        ...
        'dragdrop',
    )

2. Include the dragdrop URLconf in your project urls.py like this::

    url(r'', include('dragdrop.urls')),

3. Run `python manage.py migrate` to create the dragdrop models.

4. Start the development server and visit http://127.0.0.1:8000/admin/
   to create a BigML file (you'll need the Admin app enabled).

5. Visit http://127.0.0.1:8000/ to drag and drop your first CSV file.