import { patchIssueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../../auth/authOptions';

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { id } = await params;
    const issueId = parseInt(id);

    if (Number.isNaN(issueId))
      return NextResponse.json({ error: 'Invalid issue ID' }, { status: 400 });

    const validation = patchIssueSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const { assignedToUserId, title, description, status } = validation.data;

    if (assignedToUserId) {
      const user = await prisma.user.findUnique({
        where: { id: assignedToUserId },
      });
      if (!user) {
        return NextResponse.json(
          { error: 'Assigned user not found' },
          { status: 400 },
        );
      }
    }

    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!issue)
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

    const statusToUpdate =
      assignedToUserId !== undefined && assignedToUserId !== null
        ? (status ?? Status.IN_PROGRESS)
        : status;

    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title,
        description,
        assignedToUserId,
        status: statusToUpdate,
      },
    });

    return NextResponse.json(updatedIssue);
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred while updating the issue.' },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const issueId = parseInt(id);

    if (Number.isNaN(issueId))
      return NextResponse.json({ error: 'Invalid issue ID' }, { status: 400 });

    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!issue)
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

    await prisma.issue.delete({
      where: { id: issueId },
    });

    return NextResponse.json({ message: 'Issue deleted successfully' });
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred while deleting the issue.' },
      { status: 500 },
    );
  }
};
