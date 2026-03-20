from rest_framework import serializers
from .models import User, Institution, LearnerProfile, Opportunity, Application, Match, GapAlert

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password_hash', 'role', 'first_name', 'phone', 'created_at']

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['id', 'user', 'name', 'type', 'district', 'created_at']

class LearnerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearnerProfile
        fields = ['id', 'user', 'institution', 'district', 'nqf_level', 'qualification', 'skills', 'status', 'updated_at']

class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = ['id', 'employer', 'title', 'type', 'district', 'nqf_required', 'skills_required', 'stipend', 'spots_available', 'status', 'closes_at', 'created_at']

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'learner', 'opportunity', 'status', 'channel', 'applied_at']

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['id', 'learner', 'opportunity', 'fit_score', 'ai_reason', 'matched_at']

class GapAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = GapAlert
        fields = ['id', 'district', 'alert_type', 'learners_ready', 'learners_placed', 'detail', 'status', 'created_at']
