import { getAnnouncements } from '@/app/actions/announcements';
import { AnnouncementsClient } from './announcements-client';

export default async function AnnouncementsPage() {
 const announcements = await getAnnouncements();

 return (
 <div>
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-gray-900 mb-2">
 Announcements
 </h1>
 <p className="text-gray-600 ">
 Manage scrolling announcement messages
 </p>
 </div>

 <AnnouncementsClient initialAnnouncements={announcements} />
 </div>
 );
}
