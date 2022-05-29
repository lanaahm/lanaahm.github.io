export const data = {
  user: {
    name: 'L A N'
  },
  summary: [
    {
      title: 'Sales',
      subtitle: 'Total sales today',
      value: '$1.000',
      percent: 70
    },
    {
      title: 'Orders',
      subtitle: 'Total orders today',
      value: '3000',
      percent: 49
    },
    {
      title: 'Revenue',
      subtitle: 'Total revenue today',
      value: '$678',
      percent: 38
    },
    {
      title: 'Visits',
      subtitle: 'Total visits today',
      value: '2345',
      percent: 55
    }
  ],
  revenueSummary: {
    title: 'Revenue',
    value: '$678',
    chartData: {
      labels: ['May', 'Jun', 'July', 'Aug', 'May', 'Jun', 'July', 'Aug'],
      data: [300, 300, 280, 380, 200, 300, 280, 350]
    }
  }
};

export const form = {
  employeeHistory: {
    inputs: [
      {
        id: 'company',
        type: 'text',
        label: 'Company',
        placeholder: 'Company Name'
      },
      {
        id: 'startWork',
        type: 'date',
        label: 'Start Works'
      },
      {
        id: 'endWork',
        type: 'date',
        label: 'End Works'
      }
    ],
    header: ['Company', 'Start Work', 'End Work', 'Action'],
    collection: 'EmployeeHistory'
  },
  certification: {
    inputs: [
      {
        id: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Title'
      },
      {
        id: 'obtained',
        type: 'date',
        label: 'Obtained'
      },
      {
        id: 'expired',
        type: 'date',
        label: 'Expired'
      }
    ],
    header: ['Title', 'Obtained', 'Expired', 'Action'],
    collection: 'Certification'
  },
  experience: {
    inputs: [
      {
        id: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Title'
      },
      {
        id: 'category',
        type: 'text',
        label: 'category',
        placeholder: 'category'
      }
    ],
    header: ['Title', 'Categori', 'Action'],
    collection: 'Experience'
  },
  portfolio: {
    inputs: [
      {
        id: 'image',
        type: 'file',
        imageUpload: true,
        label: 'Cover Portfolio'
      },
      {
        id: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Title'
      },
      {
        id: 'description',
        type: 'text',
        label: 'Description',
        placeholder: 'Description'
      },
      {
        id: 'link',
        type: 'text',
        label: 'Link',
        category: true,
        placeholder: 'https://github.com'
      }
    ],
    header: ['Images', 'Title', 'Description', 'Link', 'Action'],
    collection: 'Portfolio'
  },
  settings: {
    inputs: [
      {
        id: 'name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Full name'
      },
      {
        id: 'description',
        type: 'text',
        label: 'Description',
        placeholder: 'Description'
      },
      {
        id: 'numberPhone',
        type: 'text',
        label: 'Number Phone',
        placeholder: '62...'
      },
      {
        id: 'email',
        type: 'text',
        label: 'Email',
        placeholder: 'Email'
      },
      {
        id: 'github',
        type: 'text',
        label: 'Github',
        placeholder: 'Github'
      },
      {
        id: 'kaggle',
        type: 'text',
        label: 'Kaggle',
        placeholder: 'Kaggle'
      },
      {
        id: 'linkedin',
        type: 'text',
        label: 'Linkedin',
        placeholder: 'Linkedin'
      },
      {
        id: 'medium',
        type: 'text',
        label: 'Medium',
        placeholder: 'Medium'
      }
    ],
    collection: 'Settings'
  }
};
