from django.core.paginator import Paginator
from django.http import HttpResponseNotAllowed,HttpResponse
from django.shortcuts import render, get_object_or_404
from django.db.models import Q

from ..programmers import score
from ..models import Question

def mainpage(request):
    return render(request, 'home/mainpage.html')

def about(request):
    return render(request, 'home/about.html')

def programmers_score(request):
    score = score(request)
    return HttpResponse(score)

def features(request):
    context = {'score':score}
    return render(request, 'home/features.html',context)

def index(request):
    page = request.GET.get('page', '1') # 페이지
    kw = request.GET.get('kw', '')  # 검색어
    question_list = Question.objects.order_by('-create_date')
    if kw:
        question_list = question_list.filter(
            Q(subject__icontains=kw) |  # 제목 검색
            Q(content__icontains=kw) |  # 내용 검색
            Q(answer__content__icontains=kw) |  # 답변 내용 검색
            Q(author__username__icontains=kw) |  # 질문 글쓴이 검색
            Q(answer__author__username__icontains=kw)  # 답변 글쓴이 검색
        ).distinct()
    paginator = Paginator(question_list, 10)  # 페이지당 10개씩 보여주기
    page_obj = paginator.get_page(page)
    context = {'question_list': page_obj, 'page': page, 'kw': kw}
    return render(request, 'Jun/question_list.html', context)

def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    context = {'question': question}
    return render(request, 'Jun/question_detail.html', context)