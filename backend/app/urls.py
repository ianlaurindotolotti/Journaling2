from django.urls import path
from . import views

urlpatterns = [
    path("home/", views.HomeView.as_view(), name="home" ),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("delete/<int:id>", views.DeleteView.as_view(), name="delete"),
    path("create/", views.CreateView.as_view(), name="create"),
    path("edit/<int:id>", views.UpdateView.as_view(), name="update")
]