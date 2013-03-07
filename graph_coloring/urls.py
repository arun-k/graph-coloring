from django.conf.urls import patterns, include, url
from color_graph.views import graph

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',('^$',graph),
    # Examples:
    # url(r'^$', 'graph_coloring.views.home', name='home'),
    # url(r'^graph_coloring/', include('graph_coloring.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
