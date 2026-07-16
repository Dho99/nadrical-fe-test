import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface IProps {
  users: User[];
  handleDelete?: (id: User["id"]) => void;
}

function UsersTable({ users, handleDelete }: IProps) {
  return (
    <div className="rounded-2xl border border-[#27272A] bg-[#18181B] p-6 shadow-xl">
      <Table>
        <TableCaption className="text-[#71717A]">
          Manage all registered users in the system.
        </TableCaption>

        <TableHeader>
          <TableRow className="border-[#27272A] hover:bg-transparent">
            <TableHead className="text-[#A1A1AA]">ID</TableHead>
            <TableHead className="text-[#A1A1AA]">Name</TableHead>
            <TableHead className="text-[#A1A1AA]">Username</TableHead>
            <TableHead className="text-[#A1A1AA]">Email</TableHead>
            <TableHead className="text-[#A1A1AA]">City</TableHead>
            <TableHead className="text-right text-[#A1A1AA]">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="border-[#27272A] transition-all duration-200 hover:bg-[#202024]">
              <TableCell>
                <Badge className="border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                  #{user.id}
                </Badge>
              </TableCell>

              <TableCell className="font-semibold text-[#FAFAFA]">
                {user.name}
              </TableCell>

              <TableCell className="text-[#A1A1AA]">@{user.username}</TableCell>

              <TableCell className="text-[#D4D4D8]">{user.email}</TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  className="border-[#3F3F46] bg-[#09090B] text-[#A1A1AA]">
                  {user.address?.city}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-[#F43F5E] text-white transition-all hover:bg-[#FB7185] hover:shadow-[0_0_18px_rgba(244,63,94,.35)]">
                      Delete
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="max-w-xl rounded-2xl border border-[#27272A] bg-[#18181B] p-8 text-[#FAFAFA] shadow-[0_0_35px_rgba(168,85,247,.12)]">
                    <AlertDialogHeader className="space-y-3">
                      <AlertDialogTitle className="text-2xl font-bold text-[#FAFAFA]">
                        Delete User
                      </AlertDialogTitle>

                      <AlertDialogDescription className="text-base leading-relaxed text-[#A1A1AA]">
                        This action cannot be undone. The selected user will be
                        permanently removed from the system.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="mt-8 gap-3">
                      <AlertDialogCancel className="!border-[#3F3F46] !bg-[#09090B] !text-[#FAFAFA] hover:!bg-[#202024] hover:!text-[#FAFAFA]">
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogAction
                        onClick={() => handleDelete?.(user.id)}
                        className="!bg-[#F43F5E] !text-white hover:!bg-[#FB7185]">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UsersTable;
