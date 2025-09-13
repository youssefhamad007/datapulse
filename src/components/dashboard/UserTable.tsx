import { useState } from "react";
import { MoreHorizontal, Edit, Trash2, Eye, ChevronUp, ChevronDown, UserPlus, X } from "lucide-react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "User" | "Guest";
  status: "Active" | "Inactive" | "Pending";
  lastSeen: string;
  avatar?: string;
  joinDate?: string;
  phone?: string;
  department?: string;
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Admin",
    status: "Active",
    lastSeen: "2 minutes ago",
    joinDate: "2023-01-15",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    avatar: "/placeholder-avatar-1.jpg",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "Manager",
    status: "Active",
    lastSeen: "1 hour ago",
    joinDate: "2023-03-22",
    phone: "+1 (555) 234-5678",
    department: "Marketing",
    avatar: "/placeholder-avatar-2.jpg",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "User",
    status: "Inactive",
    lastSeen: "2 days ago",
    joinDate: "2023-06-10",
    phone: "+1 (555) 345-6789",
    department: "Sales",
    avatar: "/placeholder-avatar-3.jpg",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david@example.com",
    role: "User",
    status: "Active",
    lastSeen: "5 minutes ago",
    joinDate: "2023-08-05",
    phone: "+1 (555) 456-7890",
    department: "Support",
    avatar: "/placeholder-avatar-4.jpg",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    role: "Manager",
    status: "Pending",
    lastSeen: "Never",
    joinDate: "2023-12-01",
    phone: "+1 (555) 567-8901",
    department: "HR",
    avatar: "/placeholder-avatar-5.jpg",
  },
];

type SortKey = keyof User;
type SortOrder = "asc" | "desc";

interface UserTableProps {
  className?: string;
  delay?: number;
}

export function UserTable({ className, delay = 0 }: UserTableProps) {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const { toast } = useToast();

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    
    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleAllUsers = () => {
    setSelectedUsers(
      selectedUsers.length === users.length ? [] : users.map(u => u.id)
    );
  };

  const handleEditUser = (user: User) => {
    setEditUser({ ...user });
  };

  const handleSaveUser = () => {
    if (editUser) {
      setUsers(prev =>
        prev.map(user =>
          user.id === editUser.id ? editUser : user
        )
      );
      setEditUser(null);
      toast({
        title: "User updated",
        description: `${editUser.name} has been updated successfully.`,
      });
    }
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    setUsers(prev => prev.filter(u => u.id !== userId));
    setSelectedUsers(prev => prev.filter(id => id !== userId));
    setDeleteUserId(null);
    toast({
      title: "User deleted",
      description: `${user?.name} has been removed from the system.`,
      variant: "destructive",
    });
  };

  const handleAddUser = (newUser: Omit<User, "id">) => {
    const user: User = {
      ...newUser,
      id: (users.length + 1).toString(),
    };
    setUsers(prev => [...prev, user]);
    setShowAddUser(false);
    toast({
      title: "User added",
      description: `${user.name} has been added to the system.`,
    });
  };

  const getStatusBadge = (status: User["status"]) => {
    const variants = {
      Active: "default",
      Inactive: "secondary",
      Pending: "outline",
    } as const;

    const colors = {
      Active: "bg-success/10 text-success border-success/20",
      Inactive: "bg-muted text-muted-foreground",
      Pending: "bg-warning/10 text-warning border-warning/20",
    };

    return (
      <Badge 
        variant={variants[status]}
        className={cn(colors[status], "transition-colors duration-200")}
      >
        {status}
      </Badge>
    );
  };

  const getRoleBadge = (role: User["role"]) => {
    const colors = {
      Admin: "bg-destructive/10 text-destructive border-destructive/20",
      Manager: "bg-primary/10 text-primary border-primary/20",
      User: "bg-secondary text-secondary-foreground",
      Guest: "bg-muted text-muted-foreground",
    };

    return (
      <Badge variant="outline" className={cn(colors[role], "transition-colors duration-200")}>
        {role}
      </Badge>
    );
  };

  const SortButton = ({ column, children }: { column: SortKey; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(column)}
      className={cn(
        "h-auto p-0 font-medium hover:bg-transparent",
        "flex items-center gap-1 transition-colors duration-200"
      )}
    >
      {children}
      {sortKey === column && (
        sortOrder === "asc" ? 
          <ChevronUp className="h-3 w-3" /> : 
          <ChevronDown className="h-3 w-3" />
      )}
    </Button>
  );

  const UserForm = ({ user, onSave, onCancel }: { 
    user?: User | null; 
    onSave: (user: any) => void; 
    onCancel: () => void; 
  }) => {
    const [formData, setFormData] = useState({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "User",
      status: user?.status || "Active",
      phone: user?.phone || "",
      department: user?.department || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as User["role"] }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Guest">Guest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as User["status"] }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {user ? "Update User" : "Add User"}
          </Button>
        </DialogFooter>
      </form>
    );
  };

  return (
    <Card className={cn(
      "glass border-card-border",
      "transition-all duration-300",
      `animate-fade-in-up delay-${delay}`,
      className
    )}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">User Management</CardTitle>
            <CardDescription>
              Manage users and their roles ({users.length} total users)
            </CardDescription>
          </div>
          <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with the details below.
                </DialogDescription>
              </DialogHeader>
              <UserForm
                onSave={handleAddUser}
                onCancel={() => setShowAddUser(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedUsers.length === users.length}
                  onCheckedChange={toggleAllUsers}
                  className="transition-colors duration-200"
                />
              </TableHead>
              <TableHead>
                <SortButton column="name">User</SortButton>
              </TableHead>
              <TableHead>
                <SortButton column="role">Role</SortButton>
              </TableHead>
              <TableHead>
                <SortButton column="status">Status</SortButton>
              </TableHead>
              <TableHead>
                <SortButton column="lastSeen">Last Seen</SortButton>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user, index) => (
              <TableRow
                key={user.id}
                className={cn(
                  "hover:bg-accent/30 transition-all duration-200 border-border",
                  "group cursor-pointer",
                  `animate-fade-in delay-${(index + 1) * 50}`,
                  selectedUsers.includes(user.id) && "bg-accent/20"
                )}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => toggleUserSelection(user.id)}
                    className="transition-colors duration-200"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getRoleBadge(user.role)}
                </TableCell>
                <TableCell>
                  {getStatusBadge(user.status)}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.lastSeen}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-8 w-8 opacity-0 group-hover:opacity-100",
                          "transition-opacity duration-200 hover-scale"
                        )}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end"
                      className="glass border-glass-border animate-scale-in"
                    >
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="hover:bg-accent/50 transition-colors duration-200"
                        onClick={() => setViewUser(user)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="hover:bg-accent/50 transition-colors duration-200"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit user
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="hover:bg-destructive/50 transition-colors duration-200"
                        onClick={() => setDeleteUserId(user.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* View User Dialog */}
        <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            {viewUser && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={viewUser.avatar} alt={viewUser.name} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {viewUser.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{viewUser.name}</h3>
                    <p className="text-muted-foreground">{viewUser.email}</p>
                    <div className="flex gap-2 mt-2">
                      {getRoleBadge(viewUser.role)}
                      {getStatusBadge(viewUser.status)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">{viewUser.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="font-medium">Department</p>
                    <p className="text-muted-foreground">{viewUser.department || "N/A"}</p>
                  </div>
                  <div>
                    <p className="font-medium">Join Date</p>
                    <p className="text-muted-foreground">{viewUser.joinDate || "N/A"}</p>
                  </div>
                  <div>
                    <p className="font-medium">Last Seen</p>
                    <p className="text-muted-foreground">{viewUser.lastSeen}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user information and permissions.
              </DialogDescription>
            </DialogHeader>
            {editUser && (
              <UserForm
                user={editUser}
                onSave={handleSaveUser}
                onCancel={() => setEditUser(null)}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the user
                account and remove their data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteUserId && handleDeleteUser(deleteUserId)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete User
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}