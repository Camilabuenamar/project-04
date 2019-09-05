from django.db import models
from multiselectfield import MultiSelectField

# Create your models here.
class Skill(models.Model):
    TECHNOLOGY_CHOICES = (
        ('JavaScript', 'JavaScript'),
        ('Python', 'Python'),
        ('React', 'React'),
        ('Java', 'Java'),
        ('HTML', 'HTML'),
        ('Git', 'Git'),
        ('Node.js', 'Node.js'),
        ('CSS', 'CSS'),
        ('MySQL', 'MySQL'),
        ('Amazon Web Services (AWS)', 'Amazon Web Services (AWS)'),
        ('C++', 'C++'),
        ('PostgreSQL', 'PostgreSQL'),
        ('Bash/Shell', 'Bash/Shell'),
        ('Angular', 'Angular'),
        ('React Native', 'React Native'),
        ('MongoDB', 'MongoDB'),
        ('Ruby on Rails', 'Ruby on Rails'),
        ('PHP', 'PHP'),
        ('C', 'C'),
    )
    KNOWLEDGE_CHOICES = (
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('High', 'High'),
    )
    name = models.CharField(max_length=50, choices=TECHNOLOGY_CHOICES, default=None)
    level = models.CharField(max_length=50, choices=KNOWLEDGE_CHOICES, default=None)

    def __str__(self):
        return f'{self.name} - {self.level}'

class Offer(models.Model):
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
    TECHNOLOGY_CHOICES = (
        ('JavaScript', 'JavaScript'),
        ('Python', 'Python'),
        ('React', 'React'),
        ('Java', 'Java'),
        ('HTML', 'HTML'),
        ('Git', 'Git'),
        ('Node.js', 'Node.js'),
        ('CSS', 'CSS'),
        ('MySQL', 'MySQL'),
        ('Amazon Web Services (AWS)', 'Amazon Web Services (AWS)'),
        ('C++', 'C++'),
        ('PostgreSQL', 'PostgreSQL'),
        ('Bash/Shell', 'Bash/Shell'),
        ('Angular', 'Angular'),
        ('React Native', 'React Native'),
        ('MongoDB', 'MongoDB'),
        ('Ruby on Rails', 'Ruby on Rails'),
        ('PHP', 'PHP'),
        ('C', 'C'),
    )
    company = models.CharField(max_length=50)
    #company = models.ForeignKey(CompanyUser, related_name='offers', on_delete=models.CASCADE)
    jobtitle = models.CharField(max_length=50)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default=None)
    wage = models.IntegerField()
    experience_in_years = models.IntegerField()
    description_of_role = models.CharField(max_length=1000)
    technologies = MultiSelectField(choices=TECHNOLOGY_CHOICES)
    qualifications = models.CharField(max_length=1000)
    benefits = models.CharField(max_length=1000)
    applications_received = models.IntegerField()

    def __str__(self):
        return f'{self.company} - {self.jobtitle}'



#class CustomUser(AbstractBaseUser):
#    ROLE_CHOICES = (
#    ('Frontend', 'Frontend'),
#    ('Backend', 'Backend'),
#    ('Full Stack', 'Full Stack'),
#    ('Android', 'Android'),
#    ('Data Science', 'Data Science'),
#    ('Devops', 'Devops'),
#    ('Embedded Systems', 'Embedded Systems'),
#    ('iOS', 'iOS'),
#    ('Machine Learning', 'Machine Learning'),
#    ('Robotics', 'Robotics'),
#    )
#    username = models.CharField(max_length=50)
#    firstname = models.CharField(max_length=50)
#    lastname = models.CharField(max_length=50)
#    headline = models.CharField(max_length=250)
#    roles = MultiSelectField(choices=ROLE_CHOICES)
#    linkedin = models.URLField()
#    portfolio = models.URLField()
#    github = models.URLField()
#    cv = models.FileField(upload_to=None, max_length=100)
#    skills = models.ManyToManyField(Skills, related_name='users')
#
#    def __str__(self):
#        return self.username
#
#class CompanyUser(models.Model):
#    INDUSTRY_CHOICES = (
#    ('Consumer Goods and Services', 'Consumer Goods and Services'),
#    ('B2B Software and Services', 'B2B Software and Services'),
#    ('Industrial', 'Industrial'),
#    ('Healthcare', 'Healthcare'),
#    ('Education', 'Education'),
#    ('Consumer Media', 'Consumer Media'),
#    ('Government', 'Government'),
#    ('Financial Technology and Services', 'Financial Technology and Services'),
#    ('Agriculture', 'Agriculture'),
#    ('Automotive', 'Automotive'),
#    ('Energy and Environment', 'Energy and Environment'),
#    ('Real Estate and Construction', 'Real Estate and Construction'),
#    ('Aerospace', 'Aerospace'),
#    )
#    user = models.OneToOneField(User, on_delete=models.CASCADE)
#    name = models.CharField(max_length=50)
#    location = models.CharField(max_length=50)
#    description = models.CharField(max_length=1000)
#    website = models.URLField()
#    women_achievements = models.CharField(max_length=1000, required=False)
#    employees = models.IntegerField()
#    offers = models.ManyToManyField(Skills, related_name='users', blank=True)
#
#    def __str__(self):
#        return self.username
