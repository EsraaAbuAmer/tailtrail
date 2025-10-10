export interface Pet {
    _id: string;
    name: string;
    type: string;
    status: 'Lost' | 'Found';
    description?: string;
    photos: string[];
    location: {
      city: string;
      country: string;
    };
    createdBy: {
      name: string;
      phone: string;
    };
    createdAt: string;
  }