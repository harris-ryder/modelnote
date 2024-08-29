import React, { useEffect, useState } from 'react';
import Navbar from '../components/ui/nav-bar';
import { useApiStore } from '../store/api-store';
import IconButton from '../components/ui/icon-button';
import Footer from '../components/ui/footer';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  const user = useApiStore((s) => s.user);
  const fetchUser = useApiStore((s) => s.fetchUser);

  useEffect(() => {
    fetchUser(); // Fetch user information on component mount
    console.log("on mount", user);
  }, [fetchUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const faqItems: FAQItem[] = [
    {
      question: 'What is ModelNote?',
      answer: 'ModelNote is a user-friendly 3D collaboration tool that allows you to view and share 3D models directly in your browser. Our unique feature enables you to add comments to the models, facilitating effective feedback and communication.',
    },
    {
      question: 'Which file formats does ModelNote support?',
      answer: 'Currently, ModelNote supports STL, OBJ, GLB, GLTF, and FBX file formats. We are actively working on expanding our support to include many more formats in the near future.',
    },
    {
      question: 'Is ModelNote compatible with my CAD software?',
      answer: 'ModelNote is compatible with most CAD packages that can export to our supported file formats. This includes popular software such as Rhino, SolidWorks, Fusion360, OnShape, Blender, Creo, Maya, FreeCAD, and many others.',
    },
    {
      question: 'How secure are my uploaded models?',
      answer: 'Your models are completely secure. By default, all uploaded models are private and accessible only to you. You have the option to share models privately with selected users or make them public, allowing anyone with the link to view them.',
    },
    {
      question: 'How does ModelNote handle my data?',
      answer: 'We prioritize your privacy and data security. We use Google login solely for authentication purposes. Your email is used only to facilitate model sharing between users. Uploaded CAD files are compressed and stored securely in our database, remaining inactive until you access them again.',
    },
  ];

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className="fixed top-0 left-4 right-4 h-10 bg-white z-10">
      </div>

      <Navbar
        route="FAQ"
        buttons={[user ? "dashboard" : "login"]}
        isLoggedIn={!!user}
      />
      <div className="max-w-2xl mx-auto mt-28 space-y-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Frequently Asked Questions</h2>
        {faqItems.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <button
              className="w-full p-4 text-left text-gray-800 font-semibold focus:outline-none flex justify-between items-center"
              onClick={() => toggleAnswer(index)}
            >
              {item.question}
              <IconButton className={`transform ${activeIndex === index ? 'rotate-180' : ''} transition-transform duration-300`} variant='ghost' icon='ChevronUp' />
            </button>
            <div
              className={`bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="p-4 text-gray-700">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
      <Footer />

    </>

  );
};

export default FAQPage;
