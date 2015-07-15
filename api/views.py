from django.views.generic.base import View
from django.http import JsonResponse
from api.hash import GetHash
import json


class HashView(View):
    def get(self, request,  algorithm, text=""):
        hash_obj = GetHash(algorithm)
        return JsonResponse(hash_obj.gethash(text))

    def post(self, request, algorithm, text=""):
        data = json.loads(request.body)
        text = data.get('text', "")
        hash_obj = GetHash(algorithm)
        return JsonResponse(hash_obj.gethash(text))
