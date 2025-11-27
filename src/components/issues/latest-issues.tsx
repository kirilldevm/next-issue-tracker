import { getAllIssues } from '@/lib/db/issues';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';

export default async function LatestIssues() {
  const latestIssues = await getAllIssues({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });
  return (
    <Table>
      <TableBody>
        {latestIssues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
