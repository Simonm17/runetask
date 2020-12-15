from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        ''' Only logged in users can create new tasks.
            Unlogged users can read.
        '''
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated


    def has_object_permission(self, request, view, obj):
        '''
            Only task owner or admin can modify tasks.
            Else read only.
        '''
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.created_by == request.user or request.user.is_superuser