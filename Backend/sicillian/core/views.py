from rest_framework import generics
from .models import User, Institution, LearnerProfile, Opportunity, Application, Match, GapAlert
from .serializers import (
    UserSerializer, InstitutionSerializer, LearnerProfileSerializer, 
    OpportunitySerializer, ApplicationSerializer, MatchSerializer, GapAlertSerializer
)

# User Views
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Institution Views
class InstitutionListCreate(generics.ListCreateAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer

class InstitutionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer

# LearnerProfile Views
class LearnerProfileListCreate(generics.ListCreateAPIView):
    queryset = LearnerProfile.objects.all()
    serializer_class = LearnerProfileSerializer

class LearnerProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LearnerProfile.objects.all()
    serializer_class = LearnerProfileSerializer

# Opportunity Views
class OpportunityListCreate(generics.ListCreateAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

class OpportunityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

# Application Views
class ApplicationListCreate(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

class ApplicationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

# Match Views
class MatchListCreate(generics.ListCreateAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

class MatchDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

# GapAlert Views
class GapAlertListCreate(generics.ListCreateAPIView):
    queryset = GapAlert.objects.all()
    serializer_class = GapAlertSerializer

class GapAlertDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = GapAlert.objects.all()
    serializer_class = GapAlertSerializer
