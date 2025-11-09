# Page snapshot

```yaml
- dialog "Unhandled Runtime Error" [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - navigation [ref=e7]:
          - button "previous" [disabled] [ref=e8]:
            - img "previous" [ref=e9]
          - button "next" [disabled] [ref=e11]:
            - img "next" [ref=e12]
          - generic [ref=e14]: 1 of 1 error
          - generic [ref=e15]:
            - text: Next.js (14.2.33) is outdated
            - link "(learn more)" [ref=e17] [cursor=pointer]:
              - /url: https://nextjs.org/docs/messages/version-staleness
        - button "Close" [ref=e18] [cursor=pointer]:
          - img [ref=e20]
      - heading "Unhandled Runtime Error" [level=1] [ref=e23]
      - paragraph [ref=e24]: "TypeError: filteredPieces.map is not a function"
    - generic [ref=e25]:
      - heading "Source" [level=2] [ref=e26]
      - generic [ref=e27]:
        - link "src\\app\\gallery\\page.tsx (122:29) @ map" [ref=e29] [cursor=pointer]:
          - generic [ref=e30]: src\app\gallery\page.tsx (122:29) @ map
          - img [ref=e31]
        - generic [ref=e35]: "120 | ) : ( 121 | <div className=\"columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6\"> > 122 | {filteredPieces.map((piece, index) => ( | ^ 123 | <div 124 | key={piece.id} 125 | className=\"mb-6 break-inside-avoid animate-fade-in\""
      - heading "Call Stack" [level=2] [ref=e36]
      - button "Show collapsed frames" [ref=e37] [cursor=pointer]
```