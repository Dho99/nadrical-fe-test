import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { User } from "@/types/user";
import { Button } from "../ui/button";

interface IProps {
    users: User[];
    handleDelete?: (id: User["id"]) => void;
}

function UsersTable({ users, handleDelete }: IProps) {
    return (
        <Table>
            <TableCaption>A list of users.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.address?.city}</TableCell>
                        <TableCell>
                            <Button
                                variant={"destructive"}
                                size={"sm"}
                                onClick={() => handleDelete?.(user?.id)}
                            >
                                Hapus
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>Total Listed Users</TableCell>
                    <TableCell className="text-end">{users?.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}

export default UsersTable;
