from django.shortcuts import render_to_response


def string(request):
    return render_to_response('string.html', locals())


def text(request):
    return render_to_response('text.html', locals())


def file(request):
    return render_to_response('file.html', locals())


def api(request):
    return render_to_response('api.html', locals())
