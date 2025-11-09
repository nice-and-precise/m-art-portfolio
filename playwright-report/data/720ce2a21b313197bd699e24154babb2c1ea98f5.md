# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - heading "Admin Login" [level=1] [ref=e4]
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]: Password
        - textbox "Password" [ref=e8]:
          - /placeholder: Enter admin password
      - generic [ref=e9]: Password is required
      - button "Login" [ref=e10] [cursor=pointer]
    - paragraph [ref=e11]:
      - text: "Default password:"
      - code [ref=e12]: admin123
  - alert [ref=e13]
```