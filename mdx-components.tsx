import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-5xl font-bold text-primary mb-6 mt-10" {...props} />, // Already styled by prose, but can override
    h2: (props) => <h2 className="text-4xl font-semibold text-secondary mt-10 mb-4 border-b border-border/30 pb-2" {...props} />, // Custom h2
    h3: (props) => <h3 className="text-3xl font-semibold mt-8 mb-3" {...props} />,
    h4: (props) => <h4 className="text-2xl font-medium mt-8 mb-2" {...props} />,
    h5: (props) => <h5 className="text-xl font-medium mt-6 mb-2" {...props} />,
    h6: (props) => <h6 className="text-lg font-medium mt-6 mb-2" {...props} />,
    p: (props) => <p className="font-thin text-lg mb-4" {...props} />,
    a: (props) => <a className="text-blue-600 underline hover:text-blue-800" {...props} />,
    ul: (props) => <ul className="list-disc pl-8 marker:text-primary space-y-2" {...props} />,
    ol: (props) => <ol className="list-decimal pl-8 marker:text-secondary space-y-2" {...props} />,
    li: (props) => <li className="font-thin text-lg" {...props} />,
    blockquote: (props) => <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 dark:text-gray-300 my-6" {...props} />,
    code: (props) => <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm font-mono" {...props} />,
    pre: (props) => <pre className="bg-gray-900 text-white rounded-lg p-4 overflow-x-auto my-6" {...props} />,
    hr: (props) => <hr className="my-8 border-t border-border/30" {...props} />,
    table: (props) => <table className="w-full border-collapse my-6" {...props} />,
    th: (props) => <th className="border-b border-border/30 px-4 py-2 text-left font-semibold bg-gray-50 dark:bg-zinc-800" {...props} />,
    td: (props) => <td className="border-b border-border/30 px-4 py-2" {...props} />,
    strong: (props) => <strong className="font-semibold text-text" {...props} />,
    em: (props) => <em className="italic text-text/80" {...props} />,
    img: (props) => <img className="rounded-lg my-6 max-w-full h-auto" {...props} />,
    ...components,
  }
}