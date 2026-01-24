'use client';

import { useState } from 'react';
import { Announcement } from '@/lib/supabase';
import {
 createAnnouncement,
 updateAnnouncement,
 deleteAnnouncement,
 toggleAnnouncementActive,
 reorderAnnouncements,
} from '@/app/actions/announcements';
import { Plus, Edit2, Trash2, ChevronUp, ChevronDown, Eye, EyeOff } from 'lucide-react';

interface Props {
 initialAnnouncements: Announcement[];
}

export function AnnouncementsClient({ initialAnnouncements }: Props) {
 const [announcements, setAnnouncements] = useState(initialAnnouncements);
 const [isAdding, setIsAdding] = useState(false);
 const [editingId, setEditingId] = useState<string | null>(null);
 const [newMessage, setNewMessage] = useState('');
 const [editMessage, setEditMessage] = useState('');
 const [loading, setLoading] = useState(false);

 const handleAdd = async () => {
 if (!newMessage.trim()) return;
 setLoading(true);
 try {
 await createAnnouncement(newMessage);
 setNewMessage('');
 setIsAdding(false);
 window.location.reload(); // Simple reload to get fresh data
 } catch (error) {
 console.error('Failed to add announcement:', error);
 alert('Failed to add announcement');
 } finally {
 setLoading(false);
 }
 };

 const handleUpdate = async (id: string) => {
 if (!editMessage.trim()) return;
 setLoading(true);
 try {
 await updateAnnouncement(id, editMessage);
 setEditingId(null);
 window.location.reload();
 } catch (error) {
 console.error('Failed to update announcement:', error);
 alert('Failed to update announcement');
 } finally {
 setLoading(false);
 }
 };

 const handleDelete = async (id: string) => {
 if (!confirm('Are you sure you want to delete this announcement?')) return;
 setLoading(true);
 try {
 await deleteAnnouncement(id);
 window.location.reload();
 } catch (error) {
 console.error('Failed to delete announcement:', error);
 alert('Failed to delete announcement');
 } finally {
 setLoading(false);
 }
 };

 const handleToggleActive = async (id: string, isActive: boolean) => {
 setLoading(true);
 try {
 await toggleAnnouncementActive(id, isActive);
 window.location.reload();
 } catch (error) {
 console.error('Failed to toggle announcement:', error);
 alert('Failed to toggle announcement');
 } finally {
 setLoading(false);
 }
 };

 const handleMoveUp = async (index: number) => {
 if (index === 0) return;
 const newOrder = [...announcements];
 [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];

 const updates = newOrder.map((item, idx) => ({
 id: item.id,
 display_order: idx + 1,
 }));

 setLoading(true);
 try {
 await reorderAnnouncements(updates);
 window.location.reload();
 } catch (error) {
 console.error('Failed to reorder:', error);
 alert('Failed to reorder');
 } finally {
 setLoading(false);
 }
 };

 const handleMoveDown = async (index: number) => {
 if (index === announcements.length - 1) return;
 const newOrder = [...announcements];
 [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];

 const updates = newOrder.map((item, idx) => ({
 id: item.id,
 display_order: idx + 1,
 }));

 setLoading(true);
 try {
 await reorderAnnouncements(updates);
 window.location.reload();
 } catch (error) {
 console.error('Failed to reorder:', error);
 alert('Failed to reorder');
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="space-y-4">
 {/* Add New Button */}
 <div className="flex justify-end">
 <button
 onClick={() => setIsAdding(true)}
 className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover text-white font-medium rounded-lg transition-colors"
 >
 <Plus className="h-5 w-5" />
 Add Announcement
 </button>
 </div>

 {/* Add Form */}
 {isAdding && (
 <div className="bg-white rounded-xl p-6 border border-gray-200 ">
 <h3 className="font-semibold text-gray-900 mb-4">New Announcement</h3>
 <textarea
 value={newMessage}
 onChange={(e) => setNewMessage(e.target.value)}
 placeholder="Enter announcement message..."
 className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 mb-4 resize-none"
 rows={3}
 autoFocus
 />
 <div className="flex gap-2">
 <button
 onClick={handleAdd}
 disabled={loading || !newMessage.trim()}
 className="px-4 py-2 bg-indigo-600 hover disabled text-white font-medium rounded-lg transition-colors"
 >
 {loading ? 'Adding...' : 'Add'}
 </button>
 <button
 onClick={() => {
 setIsAdding(false);
 setNewMessage('');
 }}
 disabled={loading}
 className="px-4 py-2 bg-gray-200 hover text-gray-900 font-medium rounded-lg transition-colors"
 >
 Cancel
 </button>
 </div>
 </div>
 )}

 {/* Announcements List */}
 <div className="space-y-3">
 {announcements.length === 0 ? (
 <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
 <p className="text-gray-500 ">No announcements yet</p>
 </div>
 ) : (
 announcements.map((announcement, index) => (
 <div
 key={announcement.id}
 className={`bg-white rounded-xl p-4 border ${announcement.is_active
 ? 'border-gray-200 '
 : 'border-gray-300 opacity-60'
 }`}
 >
 {editingId === announcement.id ? (
 <div>
 <textarea
 value={editMessage}
 onChange={(e) => setEditMessage(e.target.value)}
 className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 mb-3 resize-none"
 rows={3}
 autoFocus
 />
 <div className="flex gap-2">
 <button
 onClick={() => handleUpdate(announcement.id)}
 disabled={loading}
 className="px-3 py-1.5 bg-indigo-600 hover text-white text-sm font-medium rounded-lg"
 >
 Save
 </button>
 <button
 onClick={() => {
 setEditingId(null);
 setEditMessage('');
 }}
 disabled={loading}
 className="px-3 py-1.5 bg-gray-200 text-gray-900 text-sm font-medium rounded-lg"
 >
 Cancel
 </button>
 </div>
 </div>
 ) : (
 <div className="flex items-center gap-4">
 {/* Order Controls */}
 <div className="flex flex-col gap-1">
 <button
 onClick={() => handleMoveUp(index)}
 disabled={index === 0 || loading}
 className="p-1 hover rounded disabled"
 >
 <ChevronUp className="h-4 w-4 text-gray-600" />
 </button>
 <button
 onClick={() => handleMoveDown(index)}
 disabled={index === announcements.length - 1 || loading}
 className="p-1 hover rounded disabled"
 >
 <ChevronDown className="h-4 w-4 text-gray-600" />
 </button>
 </div>

 {/* Message */}
 <div className="flex-1">
 <p className="text-gray-900 ">{announcement.message}</p>
 </div>

 {/* Actions */}
 <div className="flex items-center gap-2">
 <button
 onClick={() => handleToggleActive(announcement.id, announcement.is_active)}
 disabled={loading}
 className="p-2 hover rounded-lg transition-colors"
 title={announcement.is_active ? 'Hide' : 'Show'}
 >
 {announcement.is_active ? (
 <Eye className="h-5 w-5 text-green-600" />
 ) : (
 <EyeOff className="h-5 w-5 text-gray-400" />
 )}
 </button>
 <button
 onClick={() => {
 setEditingId(announcement.id);
 setEditMessage(announcement.message);
 }}
 disabled={loading}
 className="p-2 hover rounded-lg transition-colors"
 >
 <Edit2 className="h-5 w-5 text-indigo-600" />
 </button>
 <button
 onClick={() => handleDelete(announcement.id)}
 disabled={loading}
 className="p-2 hover rounded-lg transition-colors"
 >
 <Trash2 className="h-5 w-5 text-red-600" />
 </button>
 </div>
 </div>
 )}
 </div>
 ))
 )}
 </div>
 </div>
 );
}
