'use client'
import React from 'react';
import { useQuery } from '@apollo/client';
import {GET_ALL_VISITORS} from '../../api/graphql/queries'

export default function VisitorsPage() {
  const { loading, error, data } = useQuery(GET_ALL_VISITORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>All Visitors</h1>
      <ul>
        {data.findAllVisitors.map((visitor: any) => (
          <li key={visitor.id}>
            <p>Email: {visitor.email}</p>
            <p>Name: {visitor.visitor_fname} {visitor.visitor_lname}</p>
            <p>Partner: {visitor.partner_fname} {visitor.partner_lname}</p>
            <p>Wedding Venue: {visitor.wed_venue}</p>
            <p>Created At: {new Date(visitor.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
