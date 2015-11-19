from django.shortcuts import render, get_object_or_404, HttpResponse
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import JsonResponse
from .models import Bigml_File
from .forms import BigmlForm
from .Util import ESTADOS
import os


# Create your views here.

def data_detail(request, pk):
    files = get_object_or_404(Bigml_File, pk=pk)
    data_set = Bigml_File.objects.all().order_by('-published_date')
    paginator = Paginator(data_set, 10)
    
    page = request.GET.get('page')
    try:
        data = paginator.page(page)
    except PageNotAnInteger:
        data = paginator.page(1)
    except EmptyPage:
        data = paginator.page(paginator.num_pages)
    return render(request, 'dragdrop/data_detail.html', {'file': files, 'data': data})

def delete_file(request, pk):
    try:
        file = get_object_or_404(Bigml_File, pk=pk)
        file.delete_ml()
        file.delete()
        data = 'True'
    except:
        data = 'False'
    return JsonResponse({'success':data})

def delete_file_detail(request, pk):
    file = get_object_or_404(Bigml_File, pk=pk)
    file.delete_ml()
    file.delete()
    return data_list(request)


def data_list(request):
    data_set = Bigml_File.objects.all().order_by('-published_date')
    paginator = Paginator(data_set, 10)
    page = request.GET.get('page')
    try:
        data = paginator.page(page)
    except PageNotAnInteger:
        data = paginator.page(1)
    except EmptyPage:
        data = paginator.page(paginator.num_pages)
    return render(request, 'dragdrop/data_list.html', {'data': data})

def new_file(request):
    ESTADOS[0] = 'false'
    ESTADOS[1] = 'false'
    ESTADOS[2] = 'false'
    extensions = ['.csv', '.arff']
    if request.method == "POST":
        form = BigmlForm(request.POST, request.FILES)
        if form.is_valid():
            files = form.save(commit=False)
            filename, file_extension = os.path.splitext(files.data.url)
            if file_extension in extensions:
                files.author = request.user
                files.url = files.data.url
                files.save()
                files.modify(files.pk)
                return JsonResponse({'pk': files.pk})
            else:
                return HttpResponse(status=201)
    else:
        form = BigmlForm()
    return render(request, 'dragdrop/form.html', {'form': form})

def check_states(request):
    return JsonResponse({'state_source': ESTADOS[0], 
                         'state_dataset': ESTADOS[1],
                         'state_model': ESTADOS[2]})