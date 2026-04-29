import { useState } from "react";
import { Shield, Users, Search, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  avatar?: string;
  lastActive: string;
}

const mockUsers: User[] = [
  { id: "1", name: "John Admin", email: "john@example.com", role: "admin", lastActive: "2 minutes ago" },
  { id: "2", name: "Sarah Editor", email: "sarah@example.com", role: "editor", lastActive: "1 hour ago" },
  { id: "3", name: "Mike Viewer", email: "mike@example.com", role: "viewer", lastActive: "3 hours ago" },
  { id: "4", name: "Emily Editor", email: "emily@example.com", role: "editor", lastActive: "1 day ago" },
  { id: "5", name: "David Viewer", email: "david@example.com", role: "viewer", lastActive: "2 days ago" },
];

const roleColors = {
  admin: "bg-destructive text-destructive-foreground",
  editor: "bg-primary text-primary-foreground",
  viewer: "bg-secondary text-secondary-foreground",
};

const permissions = [
  { id: "view_analytics", label: "View Analytics", description: "Access analytics dashboard" },
  { id: "edit_content", label: "Edit Content", description: "Create and modify content" },
  { id: "manage_users", label: "Manage Users", description: "Add and remove users" },
  { id: "system_config", label: "System Configuration", description: "Modify system settings" },
  { id: "export_data", label: "Export Data", description: "Export reports and data" },
];

export default function UserAccess() {
  const [users] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6" data-usecases="UC_263">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
            <Shield className="h-6 w-6" />
            User Access Management
          </h1>
          <p className="text-muted-foreground">
            Manage user roles and permissions
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button data-usecases="UC_263">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Invite a new user and assign their role
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="user-email">Email Address</Label>
                <Input id="user-email" type="email" placeholder="user@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button data-usecases="UC_263">Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge className={roleColors[user.role]}>
                      {user.role}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Active: {user.lastActive}
                    </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" data-usecases="UC_263">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User Permissions</DialogTitle>
                        <DialogDescription>
                          Modify role and permissions for {user.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Role</Label>
                          <Select defaultValue={user.role}>
                            <SelectTrigger data-usecases="UC_263">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-3">
                          <Label>Permissions</Label>
                          {permissions.map((permission) => (
                            <div
                              key={permission.id}
                              className="flex items-start space-x-3 p-3 rounded-lg border"
                            >
                              <Checkbox
                                id={permission.id}
                                defaultChecked={user.role === "admin"}
                                data-usecases="UC_263"
                              />
                              <div className="flex-1">
                                <Label
                                  htmlFor={permission.id}
                                  className="font-medium cursor-pointer"
                                >
                                  {permission.label}
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                  {permission.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button data-usecases="UC_263">Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Descriptions</CardTitle>
          <CardDescription>
            Overview of available roles and their default permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border">
              <Badge className={roleColors.admin}>Admin</Badge>
              <p className="mt-2 text-sm">
                Full access to all features including user management, system configuration, and analytics.
              </p>
            </div>
            <div className="p-4 rounded-lg border">
              <Badge className={roleColors.editor}>Editor</Badge>
              <p className="mt-2 text-sm">
                Can create and edit content, view analytics, and export reports.
              </p>
            </div>
            <div className="p-4 rounded-lg border">
              <Badge className={roleColors.viewer}>Viewer</Badge>
              <p className="mt-2 text-sm">
                Read-only access to dashboards and reports. Cannot modify any data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
