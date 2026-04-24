import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Users,
  Search,
  MoreVertical,
  Shield,
  Ban,
  CheckCircle,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "moderator";
  status: "active" | "suspended" | "inactive";
  joinedAt: string;
}

const mockUsers: User[] = [
  { id: "u1", name: "John Doe", email: "john@example.com", role: "user", status: "active", joinedAt: "2023-01-15" },
  { id: "u2", name: "Jane Smith", email: "jane@example.com", role: "admin", status: "active", joinedAt: "2022-11-20" },
  { id: "u3", name: "Bob Wilson", email: "bob@example.com", role: "moderator", status: "active", joinedAt: "2023-03-10" },
  { id: "u4", name: "Alice Brown", email: "alice@example.com", role: "user", status: "suspended", joinedAt: "2023-02-28" },
  { id: "u5", name: "Charlie Davis", email: "charlie@example.com", role: "user", status: "inactive", joinedAt: "2022-12-05" },
];

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [suspendUserId, setSuspendUserId] = useState<string | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleRoleChange = (userId: string, newRole: User["role"]) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    toast({
      title: "Role updated",
      description: "User role has been updated successfully.",
    });
  };

  const handleStatusChange = (userId: string, newStatus: User["status"]) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
    setSuspendUserId(null);
    toast({
      title: "Status updated",
      description: `User has been ${newStatus === "suspended" ? "suspended" : "activated"}.`,
    });
  };

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success text-white">Active</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
    }
  };

  const getRoleBadge = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-primary">Admin</Badge>;
      case "moderator":
        return <Badge variant="secondary">Moderator</Badge>;
      case "user":
        return <Badge variant="outline">User</Badge>;
    }
  };

  return (
    <div className="space-y-6" data-usecases="UC_005,UC_263">
      {/* Back Button */}
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Admin Dashboard
      </Link>

      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold md:text-3xl">User Management</h1>
        <p className="text-muted-foreground">
          Manage user accounts, roles, and permissions
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Users
          </CardTitle>
          <CardDescription>
            {filteredUsers.length} users found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.joinedAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem data-usecases="UC_263">
                          <Shield className="mr-2 h-4 w-4" />
                          View Permissions
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleRoleChange(
                              user.id,
                              user.role === "admin" ? "user" : "admin"
                            )
                          }
                          data-usecases="UC_263"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "active" ? (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setSuspendUserId(user.id)}
                            data-usecases="UC_005"
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            Suspend User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(user.id, "active")}
                            data-usecases="UC_005"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Activate User
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Suspend Confirmation */}
      <AlertDialog open={!!suspendUserId} onOpenChange={() => setSuspendUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Suspend User?</AlertDialogTitle>
            <AlertDialogDescription>
              This will prevent the user from accessing their account. They will
              not be able to sign in until their account is reactivated.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                suspendUserId && handleStatusChange(suspendUserId, "suspended")
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-usecases="UC_005"
            >
              Suspend User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
