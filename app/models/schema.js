import { EntitySchema } from "typeorm/browser";


const entitySchema = ( { name, ...props } ) => new EntitySchema( {
    name,
    tableName: name,
    ...props
} );


export const Category = entitySchema( {
    name: "Category",
    columns: {
        id: { type: "int", primary: true },
        name: { type: "text" },
        order: { type: "int" },
    },
    indices: [
        { columns: [ "order" ] }
    ]
} );


export const Asset = entitySchema( {
    name: "Asset",
    columns: {
        id: { type: "text", primary: true },
        source: { type: "text" },
        type: { type: "text" }
    }
} );


export const Location = entitySchema( {
    name: "Location",
    columns: {
        id: { type: "text", primary: true },
        name: { type: "text" },
        order: { type: "int" },
        latitude: { type: "double", nullable: true },
        longitude: { type: "double", nullable: true }
    },
    indices: [
        { columns: [ "order" ] }
    ]
} );


export const VenueDistance = entitySchema( {
    name: "VenueDistance",
    columns: {
        id: { type: "int", primary: true, generated: true },
        locationId: { type: "text" },
        distance: { type: "int" }
    },
    relations: {
        venue: {
            type: "many-to-one",
            target: "Venue"
        }
    },
    indices: [
        { columns: [ "locationId", "venue" ], unique: true },
        { columns: [ "locationId", "distance" ] }
    ]
} );


export const Venue = entitySchema( {
    name: "Venue",
    columns: {
        id: { type: "int", primary: true },
        name: { type: "text" },
        address: { type: "text", nullable: true },
        phone: { type: "text", nullable: true },
        latitude: { type: "double", nullable: true },
        longitude: { type: "double", nullable: true }
    },
    relations: {
        events: {
            type: "one-to-many",
            target: "EventSummary",
            nullable: true
        },
        distances: {
            type: "one-to-many",
            target: "VenueDistance",
            cascade: true,
            nullable: true
        }
    }
} );


export const EventItem = entitySchema( {
    name: "EventItem",
    columns: {
        id: { type: "text", primary: true },
        eventDate: { type: "date", nullable: true },
        startTime: { type: "date" },
        endTime: { type: "date" },
        allDay: { type: "boolean" },
        rsvp: { type: "boolean", default: false }
    },
    relations: {
        eventSummary: {
            type: "many-to-one",
            target: "EventSummary",
            eager: true,
            cascade: true
        }
    },
    indices: [
        { columns: [ "eventDate", "startTime", "endTime" ] },
        { columns: [ "rsvp" ] }
    ]
} );


export const EventSummary = entitySchema( {
    name: "EventSummary",
    columns: {
        id: { type: "int", primary: true },
        updatedAt: { type: "date", nullable: true },
        name: { type: "text" },

        startTime: { type: "date" },
        endTime: { type: "date", nullable: true },

        ongoing: { type: "boolean", default: false },
        allDay: { type: "boolean", default: false },

        featured: { type: "boolean", default: false },
    },
    relations: {
        item: {
            type: "one-to-many",
            target: "EventItem",
            cascade: true
        },
        venue: {
            type: "many-to-one",
            target: "Venue",
            eager: true,
            cascade: true
        },
        categories: {
            type: "many-to-many",
            target: "Category",
            joinTable: { name: "EventSummaryCategories" },
            eager: true,
            cascade: true
        },
        multimedia: {
            type: "one-to-many",
            target: "Asset",
            eager: true,
            cascade: true
        }
    }
} );


export const EventTicket = entitySchema( {
    name: "EventTicket",
    columns: {
        id: { type: "int", primary: true, generated: true },
        name: { type: "text", nullable: true },
        price: { type: "double" }
    },
    relations: {
        eventDetails: {
            type: "many-to-one",
            target: "EventDetails"
        }
    }
} );


export const EventDetails = entitySchema( {
    name: "EventDetails",
    columns: {
        id: { type: "int", primary: true },
        description: { type: "text" },
        summary: { type: "text" },
        moreInfo: { type: "text" },
        ticketUrl: { type: "text" },
    },
    relations: {
        tickets: {
            type: "one-to-many",
            target: "EventTicket",
            eager: true,
            cascade: true
        },
        venue: {
            type: "many-to-one",
            target: "Venue",
            eager: true,
            cascade: true
        }
    }
} );


export const TimePeriod = entitySchema( {
    name: "TimePeriod",
    columns: {
        id: { type: "text", primary: true },
        name: { type: "text" },
        order: { type: "int" },
    },
    indices: [
        { columns: [ "order" ] }
    ]
} );


export const UserProfile = entitySchema( {
    name: "UserProfile",
    columns: {
        id: { type: "text", primary: true },
        newUser: { type: "boolean" },
        maxDistance: { type: "int" }
    },
    relations: {
        location: {
            type: "many-to-one",
            target: "Location",
            eager: true
        },
        interests: {
            type: "many-to-many",
            target: "Category",
            joinTable: { name: "UserProfileInterests" },
            eager: true
        },
        timePeriod: {
            type: "many-to-one",
            target: "TimePeriod",
            eager: true
        }
    }
} );


export default [
    Category, Asset, Location, VenueDistance, Venue, EventItem, EventSummary,
    EventTicket, EventDetails, TimePeriod, UserProfile ];
