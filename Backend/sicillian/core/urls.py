from django.urls import path
from .views import (
    UserListCreate, UserDetail,
    InstitutionListCreate, InstitutionDetail,
    LearnerProfileListCreate, LearnerProfileDetail,
    OpportunityListCreate, OpportunityDetail,
    ApplicationListCreate, ApplicationDetail,
    MatchListCreate, MatchDetail,
    GapAlertListCreate, GapAlertDetail
)

urlpatterns = [
    # User endpoints
    path('users/', UserListCreate.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),

    # Institution endpoints
    path('institutions/', InstitutionListCreate.as_view(), name='institution-list-create'),
    path('institutions/<int:pk>/', InstitutionDetail.as_view(), name='institution-detail'),

    # LearnerProfile endpoints
    path('learner-profiles/', LearnerProfileListCreate.as_view(), name='learner-profile-list-create'),
    path('learner-profiles/<int:pk>/', LearnerProfileDetail.as_view(), name='learner-profile-detail'),

    # Opportunity endpoints
    path('opportunities/', OpportunityListCreate.as_view(), name='opportunity-list-create'),
    path('opportunities/<int:pk>/', OpportunityDetail.as_view(), name='opportunity-detail'),

    # Application endpoints
    path('applications/', ApplicationListCreate.as_view(), name='application-list-create'),
    path('applications/<int:pk>/', ApplicationDetail.as_view(), name='application-detail'),

    # Match endpoints
    path('matches/', MatchListCreate.as_view(), name='match-list-create'),
    path('matches/<int:pk>/', MatchDetail.as_view(), name='match-detail'),

    # GapAlert endpoints
    path('gap-alerts/', GapAlertListCreate.as_view(), name='gap-alert-list-create'),
    path('gap-alerts/<int:pk>/', GapAlertDetail.as_view(), name='gap-alert-detail'),
]
