from django.db import models
from django.contrib.auth.models import User
from ada.models import Skill
from multiselectfield import MultiSelectField

# Create your models here.
class Applicant(models.Model):
    ROLE_CHOICES = (
    ('Frontend', 'Frontend'),
    ('Backend', 'Backend'),
    ('Full Stack', 'Full Stack'),
    ('Android', 'Android'),
    ('Data Science', 'Data Science'),
    ('Devops', 'Devops'),
    ('Embedded Systems', 'Embedded Systems'),
    ('iOS', 'iOS'),
    ('Machine Learning', 'Machine Learning'),
    ('Robotics', 'Robotics'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    headline = models.CharField(max_length=250)
    roles = MultiSelectField(choices=ROLE_CHOICES)
    linkedin = models.URLField()
    portfolio = models.URLField()
    github = models.URLField()
    cv = models.FileField(upload_to=None, max_length=100)
    skills = models.ManyToManyField(Skill, related_name='users')

    def __str__(self):
        return self.user
