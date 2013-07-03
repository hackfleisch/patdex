

if (Decks.find().count() === 0) {
  Decks.insert({
  	createdAt: '2013-05-07T16:17:13+02:00',
    lastUpdated: '2013-05-07T16:21:13+02:00',
    username: 'brentriddell',
    name: 'Robots',
    description: 'Funny robot related patents.',
    patents: ['US4666042'],
    public: false
  });

  Decks.insert({
  	createdAt: '2013-05-07T17:04:33+02:00',
    lastUpdated: '2013-06-07T17:04:33+02:00',
    username: 'gary',
    name: 'Gary loves patents',
    description: 'Just the patents I love man.',
    patents: ['US20130018221', 'US4666042'],
    public: true
  });
};

if (Patents.find().count() === 0) {
  Patents.insert({
    number: "US4666042",
    title: "Transformable lunch-box robot",
    publication: "May 19, 1987",
    priority: "Feb 6, 1986",
    inventors: ['Ann Marie Dlott', 'Stephen P. Dlott', 'Anil Saigal'],
    applicants: [],
    classifications: ['206/542', '446/73', '206/579', '273/239', '206/315.1', '206/457'],
    link: "www.google.com/patents/US4666042",
    PDF: "patentimages.storage.googleapis.com/pdfs/US4666042.pdf",
    abstract: "A child's lunch box designed so as to be readily transformable into a toy robot is disclosed. A specially designed cover portion covers one panel of the lunch box and defines a normally concealed compartment containing attached arm members and a head member. To transform the lunch box into a toy robot, the special compartment is opened and the arm and head members contained therein are extended. The process is reversed to transform the toy robot back to a lunch box.",
    source: "Google Patents"
  });

  Patents.insert({
    number: "US20130018221",
    title: "Penis stretching systems",
    publication: "Jan 17, 2013",
    priority: "Jan 18, 2011",
    inventors: ['Justin Ball'],
    applicants: [],
    classifications: ['600/38', '601/46'],
    link: "www.google.com/patents/US20130018221",
    PDF: "patentimages.storage.googleapis.com/pdfs/US20130018221.pdf",
    abstract: "A penis stretching system designed to provide for safe, incremental stretching of a penis to increase a girth and length of the penis. The incremental stretching may be provided as Eukaryotic cells of the penis are torn and repaired. The penis stretching system comprises: a penis stretcher assembly including; a cylindrically-shaped frame; an adjustable securing strap; and at least one vibrator. The cylindrically-shaped frame includes a proximate end comprising a base engager; a distal end comprising a shaft engager; and telescoping legs. The vibrator provides vibration to provide comfort (and stimulation when needed) for a user-wearer. The penis stretcher assembly comprises the cylindrically-shaped frame, the adjustable securing strap and the vibrator in combination.",
    source: "Google Patents"
  });

};