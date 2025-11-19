# Quick Start Guide - Enhanced UI Components

## 🚀 Getting Started

All new components are ready to use! Here's how to get started with the enhanced UI/UX features.

## 📦 Installation

No additional installation needed! All components use existing dependencies:

- ✅ Framer Motion (already installed)
- ✅ Lucide React (already installed)
- ✅ Tailwind CSS (already configured)

## 🎯 Quick Examples

### 1. Using the Enhanced Button

```jsx
import Button from "@/components/Button/Button";

function MyComponent() {
  return (
    <div className="space-y-4">
      {/* Primary Button */}
      <Button variant="primary" size="lg">
        Get Started
      </Button>

      {/* Outline Button */}
      <Button variant="outline" size="md">
        Learn More
      </Button>

      {/* Full Width Button */}
      <Button variant="primary" fullWidth>
        Submit Form
      </Button>
    </div>
  );
}
```

### 2. Using Animated Sections

```jsx
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";

function MyComponent() {
  return (
    <>
      {/* Fade up animation */}
      <AnimatedSection animation="fadeUp">
        <h2>This fades up when scrolled into view</h2>
      </AnimatedSection>

      {/* Scale animation with delay */}
      <AnimatedSection animation="scale" delay={0.2}>
        <div>This scales in with a delay</div>
      </AnimatedSection>
    </>
  );
}
```

### 3. Using Cards

```jsx
import Card, { CardHeader, CardBody, CardFooter } from "@/components/Card/Card";
import Button from "@/components/Button/Button";

function MyComponent() {
  return (
    <Card hover gradient>
      <CardHeader>
        <h3 className="text-xl font-bold">Card Title</h3>
      </CardHeader>
      <CardBody>
        <p>Card content goes here...</p>
      </CardBody>
      <CardFooter>
        <Button variant="primary">Action</Button>
      </CardFooter>
    </Card>
  );
}
```

### 4. Using Modal

```jsx
import { useState } from "react";
import Modal, { ModalBody, ModalFooter } from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Modal"
        size="md"
      >
        <ModalBody>
          <p>Modal content here...</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary">Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

### 5. Using Form Inputs

```jsx
import Input, { Textarea } from "@/components/Input/Input";
import { Mail, User } from "lucide-react";

function MyForm() {
  return (
    <form className="space-y-4">
      <Input
        label="Full Name"
        placeholder="Enter your name"
        icon={<User size={20} />}
        required
      />

      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        icon={<Mail size={20} />}
        required
      />

      <Textarea
        label="Message"
        placeholder="Your message..."
        rows={5}
        required
      />
    </form>
  );
}
```

### 6. Using Section Layout

```jsx
import Section, { SectionTitle } from "@/components/Section/Section";

function MyComponent() {
  return (
    <Section padding="default" background="gradient" animate={true}>
      <SectionTitle subtitle="Discover our amazing features" centered>
        Our Services
      </SectionTitle>

      {/* Your content here */}
    </Section>
  );
}
```

### 7. Using Tabs

```jsx
import Tabs from "@/components/Tabs/Tabs";

function MyComponent() {
  const tabs = [
    {
      label: "Overview",
      content: <div>Overview content...</div>,
    },
    {
      label: "Features",
      content: <div>Features content...</div>,
    },
    {
      label: "Pricing",
      content: <div>Pricing content...</div>,
    },
  ];

  return <Tabs tabs={tabs} defaultTab={0} />;
}
```

### 8. Using Accordion

```jsx
import Accordion from "@/components/Accordion/Accordion";

function MyComponent() {
  const items = [
    {
      title: "What services do you offer?",
      content: "We offer web development, mobile apps, and IT solutions.",
    },
    {
      title: "How long does a project take?",
      content: "Project timelines vary based on complexity and requirements.",
    },
    {
      title: "What is your pricing model?",
      content: "We offer flexible pricing based on project scope and duration.",
    },
  ];

  return <Accordion items={items} />;
}
```

### 9. Using IconBox

```jsx
import IconBox from "@/components/IconBox/IconBox";
import { Code, Smartphone, Cloud } from "lucide-react";

function MyComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <IconBox
        icon={<Code />}
        title="Web Development"
        description="Custom websites built with modern technologies"
        variant="primary"
      />
      <IconBox
        icon={<Smartphone />}
        title="Mobile Apps"
        description="Native and cross-platform mobile applications"
        variant="secondary"
      />
      <IconBox
        icon={<Cloud />}
        title="Cloud Solutions"
        description="Scalable cloud infrastructure and services"
        variant="gradient"
      />
    </div>
  );
}
```

### 10. Using Badges

```jsx
import Badge from "@/components/Badge/Badge";

function MyComponent() {
  return (
    <div className="flex gap-2">
      <Badge variant="primary">New</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="gradient" size="lg">
        Featured
      </Badge>
    </div>
  );
}
```

## 🎨 Using Animation Variants

```jsx
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";

function MyComponent() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeInUp}>
        <h2>Item 1</h2>
      </motion.div>
      <motion.div variants={fadeInUp}>
        <h2>Item 2</h2>
      </motion.div>
      <motion.div variants={fadeInUp}>
        <h2>Item 3</h2>
      </motion.div>
    </motion.div>
  );
}
```

## 🔧 Using Custom Hooks

```jsx
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function MyComponent() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px",
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      Content appears when scrolled into view
    </div>
  );
}
```

## 🛠️ Using Helper Functions

```jsx
import {
  debounce,
  isValidEmail,
  formatDate,
  copyToClipboard
} from '@/utils/helpers';

function MyComponent() {
  // Debounced search
  const handleSearch = debounce((query) => {
    console.log('Searching for:', query);
  }, 300);

  // Email validation
  const validateEmail = (email) => {
    if (!isValidEmail(email)) {
      alert('Invalid email format');
    }
  };

  // Format date
  const formattedDate = formatDate(new Date());

  // Copy to clipboard
  const handleCopy = async (text) => {
    const success = await copyToClipboard(text);
    if (success) {
      alert('Copied to clipboard!');
    }
  };

  return (
    // Your component JSX
  );
}
```

## 🎯 Best Practices

### 1. Component Composition

```jsx
// ✅ Good - Compose components
<Section background="gradient">
  <Container size="default">
    <AnimatedSection animation="fadeUp">
      <SectionTitle>My Title</SectionTitle>
      <Card hover>
        <CardBody>Content</CardBody>
      </Card>
    </AnimatedSection>
  </Container>
</Section>

// ❌ Avoid - Nested animations
<AnimatedSection>
  <AnimatedSection>
    <AnimatedSection>
      Too many animations!
    </AnimatedSection>
  </AnimatedSection>
</AnimatedSection>
```

### 2. Performance

```jsx
// ✅ Good - Use AnimatedSection for scroll animations
<AnimatedSection animation="fadeUp">
  <ExpensiveComponent />
</AnimatedSection>;

// ✅ Good - Debounce expensive operations
const handleSearch = debounce(expensiveSearch, 300);
```

### 3. Accessibility

```jsx
// ✅ Good - Include labels and ARIA attributes
<Button aria-label="Close menu" onClick={handleClose}>
  <X />
</Button>

<Input
  label="Email Address"
  required
  error={emailError}
/>
```

## 📱 Responsive Design Tips

```jsx
// Use Tailwind responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols</Card>
</div>

// Responsive text sizes
<h1 className="text-2xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>

// Responsive padding
<Section padding="default" className="px-4 md:px-8 lg:px-12">
  Content
</Section>
```

## 🎨 Theming

All components use Tailwind's color system. Customize in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

## 🐛 Troubleshooting

### Animations not working?

- Ensure Framer Motion is installed: `npm install framer-motion`
- Check that the component is wrapped in a motion component

### Styles not applying?

- Run `npm run dev` to rebuild Tailwind
- Check that Tailwind is scanning the correct files in `tailwind.config.js`

### Components not found?

- Use the correct import path: `@/components/ComponentName`
- Check that the alias is configured in `vite.config.js`

## 📚 Additional Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [React Docs](https://react.dev/)

## 💡 Tips

1. **Start Small**: Begin by using one or two components, then gradually adopt more
2. **Consistency**: Use the same variants and sizes across your app
3. **Performance**: Don't overuse animations - less is more
4. **Accessibility**: Always test with keyboard navigation
5. **Mobile First**: Design for mobile, then enhance for desktop

## 🎉 You're Ready!

Start building amazing, dynamic interfaces with these enhanced components. Happy coding! 🚀
