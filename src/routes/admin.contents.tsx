import { createFileRoute } from '@tanstack/react-router';
import { AdminContentList } from '@/components/admin/AdminContentList';

export const Route = createFileRoute('/admin/contents')({
  component: AdminContentList,
});
