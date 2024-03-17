// export interface IServiceAndIndustryName {
//   name: string
//   href: string
// }

// export interface IContentHome {
//   title: string
//   slug: string
//   image: string
//   overview: string
// }

// export interface ICaseStudiesRelated {
//   title: string
//   slug: string
//   mainImage: {
//     url: string
//   }
//   overview: string
// }

// export interface IService {
//   title: string
//   slug: string
//   overview: string
//   image: {
//     url: string
//   }
//   whyWeNeed: string
//   needImage: {
//     url: string
//   }
//   howWeCanHelp: string
//   howCanWeHelpImage: {
//     url: string
//   }
//   outcome: string
//   outcomeImage: {
//     url: string
//   }
// }

// export interface ICategory {
//   category: string
//   slug: string
// }

// export interface ICaseStudyCard {
//   title: string
//   slug: string
//   overview: string
//   mainImage: {
//     url: string
//   }

//   caseStudyDetails: {
//     raw: any
//   }

//   caseStudyCategories: ICategory[]
// }

// export interface IBlogCard {
//   title: string
//   slug: string
//   shortDescription: string
//   blurHash: string
//   image: {
//     url: string
//   }

//   blogCategories: ICategory[]
// }

// export interface IBlog extends IBlogCard {
//   content: {
//     raw: any
//     text: string
//   }
// }

// export interface IIndustry {
//   title: string
//   slug: string

//   image: {
//     url: string
//   }
//   overview: {
//     raw: any
//   }
//   growthAndFuture: {
//     raw: any
//   }
//   challenges: {
//     raw: any
//   }
//   howCollaborateSolutionsCanHelp: {
//     raw: any
//   }
//   blogsAndResources: string
//   overviewImage: {
//     url: string
//   }
//   growthAndFutureImage: {
//     url: string
//   }
//   challengesImage: {
//     url: string
//   }
//   howCollaborateSolutionsCanHelpImage: {
//     url: string
//   }
// }

export interface ICountriesName {
  name: string;
  href: string;
}
export interface IServiceAndIndustryName {
  name: string;
  href: string;
}

export interface IContentHome {
  title: string;
  slug: string;
  image: string;
  overview: string;
}

export interface ICaseStudiesRelated {
  title: string;
  slug: string;
  mainImage: {
    url: string;
  };
  overview: string;
}

export interface IService {
  title: string;
  slug: string;
  overview: string;
  image: {
    url: string;
  };
  whyWeNeed: string;
  needImage: {
    url: string;
  };
  howWeCanHelp: string;
  howCanWeHelpImage: {
    url: string;
  };
  outcome: string;
  outcomeImage: {
    url: string;
  };
  cta: string;
}

export interface ICategory {
  category: string;
  slug: string;
}

export interface ICaseStudyCard {
  title: string;
  slug: string;
  overview: string;
  mainImage: {
    url: string;
  };

  caseStudyDetails: {
    raw: any;
  };

  caseStudyCategories: ICategory[];
}

export interface IBlogCard {
  title: string;
  slug: string;
  shortDescription: string;
  blurHash: string;
  image: {
    url: string;
  };

  blogCategories: ICategory[];
}

export interface IBlog extends IBlogCard {
  content: {
    raw: any;
    text: string;
  };
}

export interface IIndustry {
  title: string;
  slug: string;

  image: {
    url: string;
  };
  overview: {
    raw: any;
  };
  growthAndFuture: {
    raw: any;
  };
  challenges: {
    raw: any;
  };
  howCollaborateSolutionsCanHelp: {
    raw: any;
  };
  blogsAndResources: string;
  overviewImage: {
    url: string;
  };
  growthAndFutureImage: {
    url: string;
  };
  challengesImage: {
    url: string;
  };
  howCollaborateSolutionsCanHelpImage: {
    url: string;
  };
}

export interface ITestimonials {
  name: string;
  designation: string;
  review: string;
  profile: {
    url: string;
  };
}
