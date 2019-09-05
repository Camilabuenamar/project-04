from django.db import models
from django.contrib.auth.models import User
from ada.models import Skill
from multiselectfield import MultiSelectField

# Create your models here.
class Applicant(models.Model):
class CompanyUser(models.Model):
    INDUSTRY_CHOICES = (
    ('Consumer Goods and Services', 'Consumer Goods and Services'),
    ('B2B Software and Services', 'B2B Software and Services'),
    ('Industrial', 'Industrial'),
    ('Healthcare', 'Healthcare'),
    ('Education', 'Education'),
    ('Consumer Media', 'Consumer Media'),
    ('Government', 'Government'),
    ('Financial Technology and Services', 'Financial Technology and Services'),
    ('Agriculture', 'Agriculture'),
    ('Automotive', 'Automotive'),
    ('Energy and Environment', 'Energy and Environment'),
    ('Real Estate and Construction', 'Real Estate and Construction'),
    ('Aerospace', 'Aerospace'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    website = models.URLField()
    women_achievements = models.CharField(max_length=1000, required=False)
    employees = models.IntegerField()
    offers = models.ManyToManyField(Skills, related_name='users', blank=True)

    def __str__(self):
        return self.username
